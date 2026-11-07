import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request } from 'node:http';
import { once } from 'node:events';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSiteServer, cloudFrontViewerIp } from '../server/app.mjs';

const proxySecret = 'test-origin-secret-'.repeat(4);
async function fixture(t) {
  const dataDir = mkdtempSync(join(tmpdir(), 'sean-proxy-'));
  let calls = 0;
  const server = createSiteServer({
    origin: 'https://seanwade.com', production: true,
    secret: 'cookie-secret-'.repeat(4), apiKey: 'mock-key',
    proxyHost: 'api.seanwade.com', proxySecret, dataDir,
    fetchImpl: async () => {
      calls++;
      return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Sean builds things.' }] }] });
    },
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    rmSync(dataDir, {recursive: true, force: true});
  });
  return {
    calls: () => calls,
    send: (headers = {}, path = '/api/ask', method = 'POST') => new Promise((resolve, reject) => {
      const req = request({ hostname: '127.0.0.1', port: server.address().port, path, method, headers: {
        Host: 'api.seanwade.com', Origin: 'https://seanwade.com', 'Content-Type': 'application/json', ...headers,
      } }, res => {
        let body = ''; res.on('data', chunk => { body += chunk; });
        res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
      });
      req.on('error', reject);
      req.end(method === 'POST' ? JSON.stringify({messages: [{role: 'user', content: 'What does Sean build?'}]}) : undefined);
    }),
  };
}
const authenticated = (address = '203.0.113.1:12345') => ({'x-chat-proxy-secret': proxySecret, 'cloudfront-viewer-address': address});

test('viewer address accepts IPv4/IPv6 with valid ports and canonicalizes IPv6', () => {
  assert.equal(cloudFrontViewerIp('203.0.113.9:443'), '203.0.113.9');
  assert.equal(cloudFrontViewerIp('[2001:0db8:0:0:0:0:0:1]:65535'), '2001:db8::1');
  for (const value of [undefined, '', '203.0.113.1', '203.0.113.1:0', '203.0.113.1:65536', '999.1.2.3:44', '[127.0.0.1]:44', '2001:db8::1:44', '203.0.113.1:44, 1.2.3.4:55', '[fe80::1%eth0]:44'])
    assert.equal(cloudFrontViewerIp(value), null, String(value));
});

test('proxy authentication gates chat, config, admin, and static requests; forwarding headers do not bypass it', async t => {
  const f = await fixture(t);
  for (const path of ['/api/ask', '/api/site-config', '/api/admin', '/']) {
    assert.equal((await f.send({'x-forwarded-for': '203.0.113.4', 'cloudfront-viewer-address': '203.0.113.4:99'}, path, 'GET')).status, 403);
    assert.equal((await f.send({...authenticated(), 'x-chat-proxy-secret': 'x'.repeat(proxySecret.length)}, path, 'GET')).status, 403);
  }
  assert.equal((await f.send({...authenticated(), Host: 'seanwade.com'})).status, 403);
  assert.equal((await f.send({...authenticated(), Origin: 'https://evil.example'})).status, 403);
  assert.equal((await f.send({'x-chat-proxy-secret': proxySecret})).status, 403);
  assert.equal((await f.send(authenticated('invalid'))).status, 403);
  assert.equal(f.calls(), 0);
  assert.equal((await f.send(authenticated(), '/api/site-config', 'GET')).status, 200);
  assert.equal((await f.send(authenticated(), '/api/admin', 'GET')).status, 401);
});

test('health endpoint exposes only ok without the origin secret for GET and HEAD', async t => {
  const f = await fixture(t);
  const health = await f.send({}, '/healthz', 'GET');
  assert.equal(health.status, 200); assert.equal(health.body, 'ok');
  assert.equal(health.headers['cache-control'], 'no-store');
  const head = await f.send({}, '/healthz', 'HEAD');
  assert.equal(head.status, 200); assert.equal(head.body, '');
  assert.equal((await f.send({}, '/healthz', 'POST')).status, 403);
  assert.equal(f.calls(), 0);
});

test('authenticated viewer addresses have separate network quotas; cookies or forged forwarding cannot reset a network burst', async t => {
  const f = await fixture(t);
  for (let i = 0; i < 3; i++) assert.equal((await f.send(authenticated())).status, 200);
  assert.equal((await f.send({...authenticated(), 'x-forwarded-for': '203.0.113.22'})).status, 429);
  assert.equal((await f.send(authenticated('203.0.113.2:12345'))).status, 200);
  for (let i = 0; i < 3; i++) assert.equal((await f.send(authenticated('[2001:db8::1]:12345'))).status, 200);
  assert.equal((await f.send(authenticated('[2001:0db8:0:0:0:0:0:1]:5555'))).status, 429);
  assert.equal(f.calls(), 7);
});

test('partial or weak proxy configuration fails before opening data storage', () => {
  for (const options of [{proxyHost: 'api.seanwade.com'}, {proxySecret}, {proxySecret: 'short', proxyHost: 'api.seanwade.com'}, {proxySecret, proxyHost: 'https://api.seanwade.com'}])
    assert.throws(() => createSiteServer(options), /Proxy mode requires/);
});
