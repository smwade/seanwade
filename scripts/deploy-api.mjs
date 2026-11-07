import { createHmac } from 'node:crypto';
const secret = process.env.SHIPYARD_WEBHOOK_SECRET;
if (!secret) throw new Error('Missing SHIPYARD_WEBHOOK_SECRET');
const body = JSON.stringify({ app: 'seanwade-api', revision: process.env.GITHUB_SHA });
const signature = createHmac('sha256', secret).update(body).digest('hex');
const response = await fetch('https://deploy.davywade.com/deploy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shipyard-Signature': `sha256=${signature}` },
  body,
  signal: AbortSignal.timeout(240000),
});
if (!response.ok) throw new Error(`API deployment failed: ${response.status}`);
console.log(await response.text());
