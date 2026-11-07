"""Attach the authenticated API origin without changing existing site routing.

Requires CHAT_PROXY_SECRET and AWS credentials. Saves a private rollback snapshot.
"""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import subprocess
import tempfile

DISTRIBUTION = 'E20VQTC0TY7DFQ'

def aws(*args):
    result = subprocess.run(['aws', 'cloudfront', *args, '--output', 'json'], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr.replace(os.environ.get('CHAT_PROXY_SECRET', 'redacted'), '[redacted]'))
    return json.loads(result.stdout) if result.stdout.strip() else {}

def payload_call(command, flag, payload, *args):
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json') as file:
        os.chmod(file.name, 0o600)
        json.dump(payload, file)
        file.flush()
        return aws(command, flag, 'file://' + file.name, *args)

secret = os.environ.get('CHAT_PROXY_SECRET', '')
if len(secret) < 32:
    raise SystemExit('CHAT_PROXY_SECRET must contain at least 32 characters')
live = aws('get-distribution-config', '--id', DISTRIBUTION)
backup_dir = Path.home() / '.config/seanwade/cloudfront-backups'
backup_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
backup = backup_dir / (datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '.json')
with backup.open('x') as file:
    os.chmod(backup, 0o600)
    json.dump(live, file, indent=2)
name = 'seanwade-api-origin-request'
policies = aws('list-origin-request-policies', '--type', 'custom').get('OriginRequestPolicyList', {}).get('Items', [])
policy = next((item['OriginRequestPolicy'] for item in policies if item['OriginRequestPolicy']['OriginRequestPolicyConfig']['Name'] == name), None)
policy_config = {
    'Name': name,
    'Comment': 'Forward API cookies, JSON origin headers and verified CloudFront client address; exclude viewer Host.',
    'HeadersConfig': {'HeaderBehavior': 'whitelist', 'Headers': {'Quantity': 3, 'Items': ['Origin', 'Content-Type', 'CloudFront-Viewer-Address']}},
    'CookiesConfig': {'CookieBehavior': 'all'},
    'QueryStringsConfig': {'QueryStringBehavior': 'none'},
}
if policy:
    current = aws('get-origin-request-policy', '--id', policy['Id'])
    policy_id = payload_call('update-origin-request-policy', '--origin-request-policy-config', policy_config, '--id', policy['Id'], '--if-match', current['ETag'])['OriginRequestPolicy']['Id']
else:
    policy_id = payload_call('create-origin-request-policy', '--origin-request-policy-config', policy_config)['OriginRequestPolicy']['Id']
config = live['DistributionConfig']
origin_id = 'seanwade-chat-api'
origin = {
    'Id': origin_id, 'DomainName': 'api.seanwade.com', 'OriginPath': '',
    'CustomHeaders': {'Quantity': 1, 'Items': [{'HeaderName': 'X-Chat-Proxy-Secret', 'HeaderValue': secret}]},
    'CustomOriginConfig': {'HTTPPort': 80, 'HTTPSPort': 443, 'OriginProtocolPolicy': 'https-only', 'OriginSslProtocols': {'Quantity': 1, 'Items': ['TLSv1.2']}, 'OriginReadTimeout': 45, 'OriginKeepaliveTimeout': 5},
    'ConnectionAttempts': 2, 'ConnectionTimeout': 10,
}
origins = [item for item in config['Origins']['Items'] if item['Id'] != origin_id] + [origin]
config['Origins'] = {'Quantity': len(origins), 'Items': origins}
behavior = {
    'PathPattern': '/api/*', 'TargetOriginId': origin_id,
    'ViewerProtocolPolicy': 'https-only',
    'AllowedMethods': {'Quantity': 7, 'Items': ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'], 'CachedMethods': {'Quantity': 2, 'Items': ['GET', 'HEAD']}},
    'SmoothStreaming': False, 'Compress': True, 'FieldLevelEncryptionId': '',
    'CachePolicyId': '4135ea2d-6df8-44a3-9df3-4b5a84be39ad',
    'OriginRequestPolicyId': policy_id,
    'TrustedSigners': {'Enabled': False, 'Quantity': 0},
    'TrustedKeyGroups': {'Enabled': False, 'Quantity': 0},
    'LambdaFunctionAssociations': {'Quantity': 0},
    'FunctionAssociations': {'Quantity': 0},
}
behaviors = [item for item in config.get('CacheBehaviors', {}).get('Items', []) if item['PathPattern'] != '/api/*']
config['CacheBehaviors'] = {'Quantity': len(behaviors) + 1, 'Items': [behavior] + behaviors}
result = payload_call('update-distribution', '--distribution-config', config, '--id', DISTRIBUTION, '--if-match', live['ETag'])
print('API route update:', result['Distribution']['Status'])
print('Private rollback snapshot:', backup)
