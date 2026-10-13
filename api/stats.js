// Totals for the team: GET /api/stats?key=<STATS_KEY>. Events tagged utm_source=test are
// left out unless &all=1, so the team's own checks don't inflate the numbers.
import { list } from '@vercel/blob';

export async function GET(request) {
  const url = new URL(request.url);
  if (!process.env.STATS_KEY || url.searchParams.get('key') !== process.env.STATS_KEY) return new Response('Not found', { status: 404 });

  // keys: "cta" (all), "cta:header" (by button), "cta@school_chat" (by source); people = distinct visitors
  const tally = {};
  const bump = (k, v) => { (tally[k] ??= { total: 0, people: new Set() }).total++; tally[k].people.add(v); };
  let cursor;
  do {
    const page = await list({ prefix: 'ev/', cursor, limit: 1000 });
    for (const { pathname } of page.blobs) {
      const [, e, d, s, v] = pathname.split('/');
      if (s === 'test' && !url.searchParams.has('all')) continue;
      bump(e, v);
      if (d !== '-') bump(`${e}:${d}`, v);
      bump(`${e}@${s}`, v);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const counts = Object.fromEntries(Object.keys(tally).sort().map(k => [k, { total: tally[k].total, people: tally[k].people.size }]));
  return Response.json({ generatedAt: new Date().toISOString(), counts }, { headers: { 'cache-control': 'no-store' } });
}
