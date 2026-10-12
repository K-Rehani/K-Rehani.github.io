import { siteVersion } from '../lib/site-version';

export function GET() {
  return new Response(JSON.stringify({ version: siteVersion }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
