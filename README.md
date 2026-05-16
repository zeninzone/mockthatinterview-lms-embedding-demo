# MockThatInterview embedding example (Axia Africa demo)

This app simulates **Axia Africa** embedding `mockthatinterview-frontend` in an iframe while passing host learner context and (in **development only**) an organisation API token on the iframe URL.

## Run locally

1. **Backend:** ensure `EMBED_USER_PASSWORD_PEPPER` (min 16 chars) and `SUPABASE_KEY` (**service role**) are set, then run the Nest API (e.g. port 8000).
2. **Frontend:** `cd ../mockthatinterview-frontend`, `npm install`, `npm run dev` (default `http://localhost:5173`). Set `VITE_APP_API_BASE_URL` to your API (e.g. `http://localhost:8000`).
3. **This demo:** copy `.env.example` to `.env.local`, set `VITE_MTI_ORG_API_TOKEN` to your org’s `api_key` from `organizations`, then:

```bash
cd ../mockthatinterview-embedding-example
npm install
npm run dev
```

Open the demo (default port **4174**), sign in as “host”, and open Interview Practice to load the iframe.

## Host-to-embed flow (development)

The iframe URL includes:

- `api_token` — organisation API key (**dev-only surface**; leaks via Referer, history, and parent scripts).
- `external_user_id`, `first_name`, `last_name`, optional `email` — learner fields for `POST /embed/bootstrap`.
- `mti_embed_context` — base64url JSON for branding (`organizationId`, `branding`, optional `simulateAuth`).

The embedded frontend calls the backend `POST /embed/bootstrap`, stores Supabase `access_token` / `refresh_token`, then strips sensitive query params from the address bar.

## Production

Do **not** put the long-lived organisation API token in the iframe URL. Use a **partner BFF**: the LMS server calls MockThatInterview with the secret, receives a short-lived opaque token (or session) suitable for the iframe, and only that value appears in the browser.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_APP_FRONTEND_URL` | Base URL of the embedded MTI frontend (default `http://localhost:5173`) |
| `VITE_MTI_ORG_API_TOKEN` | Organisation `api_key` for bootstrap (keep in `.env.local`, never commit) |
# mockthatinterview-lms-embedding-demo
