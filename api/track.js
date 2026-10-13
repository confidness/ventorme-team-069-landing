// Records one landing event as a tiny private blob. The event lives in the pathname
// (ev/<event>/<detail>/<source>/<visitor>/<time>) so /api/stats can count with list() alone.
import { put } from '@vercel/blob';

const EVENTS = new Set(['view', 'quiz_done', 'cta']);
const clean = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || '-';

export async function POST(request) {
  let b;
  try { b = JSON.parse(await request.text()); } catch { return new Response(null, { status: 400 }); }
  if (!EVENTS.has(b?.e)) return new Response(null, { status: 400 });
  await put(`ev/${b.e}/${clean(b.d)}/${clean(b.s)}/${clean(b.v)}/${Date.now()}.txt`, '1', { access: 'private', addRandomSuffix: true });
  return new Response(null, { status: 204 });
}
