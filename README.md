# Ventorme landing, team 069 (HACKNEXT × Ventorme)

One static page, `index.html`, no build step. Every push to `main` redeploys on Vercel.

- **Registration link:** every button points to `https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-069`. If the team number changes, replace it in all buttons and in `TEAM_LINK`; the console logs an error if any button differs.
- **Analytics:** set `YM_ID` at the top of the script to your Yandex Metrica counter number. `0` means no tracking and no notice.
- **Preview the in-app browser note** in a normal browser: add `?inapp=1` (iPhone wording) or `?inapp=android` to the URL.
- **Preview a friend's shared link:** add `?t=a`, `c`, `p` or `e`.
- **Channel tags for inbound links:** `?utm_source=school_chat`, `instagram`, `qr`, `parents`. The share buttons add `utm_source=share` themselves.
