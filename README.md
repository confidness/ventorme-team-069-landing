# Ventorme landing, team 069 (HACKNEXT × Ventorme)

One static page, `index.html`, no build step. Every push to `main` redeploys on Vercel.

- **Registration link:** every button points to `https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-069`. If the team number changes, replace it in all buttons and in `TEAM_LINK`; the console logs an error if any button differs.
- **Built-in counter:** the page sends `view`, `quiz_done` and `cta` (registration tap) events to `api/track.js`, stored in a private Vercel Blob store. Totals: `/api/stats?key=<STATS_KEY>` (the key is a Vercel env var). Open the page with `?utm_source=test` when checking it yourself, so your taps aren't counted.
- **Analytics:** set `YM_ID` at the top of the script to your Yandex Metrica counter number. `0` means no tracking and no notice.
- **Preview the in-app browser note** in a normal browser: add `?inapp=1` (iPhone wording) or `?inapp=android` to the URL.
- **Preview a friend's shared link:** add `?t=` with a type: `a`, `c`, `p`, `e`, or a blend `ac`, `ae`, `ap`, `ce`, `cp`, `ep`.
- **Check the type rule:** open with `?selftest` and look for "selftest done" in the console with no failed asserts.
- **Channel tags for inbound links:** `?utm_source=school_chat`, `instagram`, `qr`, `parents`. The share buttons add `utm_source=share` themselves.
