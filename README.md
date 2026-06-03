# MockThatInterview LMS embedding demos

Static demos that simulate partner organisations embedding `mockthatinterview-frontend` in an iframe while passing host learner context and (in **development only**) an organisation API token on the iframe URL.

## Hosted demos (GitHub Pages)

| Path | Organisation |
|------|----------------|
| `/` | Client picker |
| `/axia-africa/` | [Axia Africa](https://axiaafrica.com/) |
| `/codeyourfuture/` | [CodeYourFuture](https://codeyourfuture.io/) |

Example project site: `https://zeninzone.github.io/mockthatinterview-lms-embedding-demo/`

## Run locally

1. **Backend:** ensure `EMBED_USER_PASSWORD_PEPPER` (min 16 chars) and `SUPABASE_KEY` (**service role**) are set, then run the Nest API (e.g. port 8000).
2. **Frontend:** `cd ../mockthatinterview-frontend`, `npm install`, `npm run dev` (default `http://localhost:5173`). Set `VITE_APP_API_BASE_URL` to your API (e.g. `http://localhost:8000`).
3. **This demo:** copy `.env.example` to `.env.local`, then:

```bash
cd ../mockthatinterview-lms-embedding-demo
npm install
```

**Axia Africa:**

```bash
# .env.local: VITE_MTI_ORG_API_TOKEN=<axia organisations.api_key>
npm run dev:axia
```

**CodeYourFuture:**

```bash
# .env.local: VITE_MTI_ORG_API_TOKEN=<cyf organisations.api_key>
#             VITE_CYF_ORGANIZATION_ID=<cyf organisations.id>
npm run dev:cyf
```

Open the demo (default port **4174**), sign in as “host”, and open Interview Practice to load the iframe.

`npm run dev` is an alias for `npm run dev:axia`.

## Deploy to GitHub Pages

Static hosting is wired for **project sites** (`https://<owner>.github.io/<repo>/`):

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Add repository secrets:
   - `MTI_ORG_API_TOKEN_AXIA` — Axia `organizations.api_key` (or keep legacy `VITE_MTI_ORG_API_TOKEN` as fallback in the workflow)
   - `MTI_ORG_API_TOKEN_CYF` — CodeYourFuture `organizations.api_key`
   - `CYF_ORGANIZATION_ID` — CodeYourFuture `organizations.id` (UUID)
4. Push to **`main`** or **`dev`** (or run **Actions → Deploy to GitHub Pages**). CI runs `npm run build`, which produces the picker at the repo root and one isolated bundle per client under `/<slug>/`.

Manual build for a Pages subpath (without Actions): set `VITE_PAGES_BASE` (see [.env.example](.env.example)) and `GITHUB_REPOSITORY=owner/repo`, then `npm run build` and upload `dist/`.

**Note:** GitHub Pages does not emit custom **`Permissions-Policy`** headers. Microphone delegation in the iframe may behave differently than on `vite dev`/`preview`.

## Host-to-embed flow (development)

The iframe URL includes:

- `api_token` — organisation API key (**dev-only surface**; leaks via Referer, history, and parent scripts).
- `external_user_id`, `first_name`, `last_name`, optional `email` — learner fields for `POST /embed/bootstrap`.
- `mti_embed_context` — base64url JSON for branding (`organizationId`, `branding`, optional `simulateAuth`).

The embedded frontend calls the backend `POST /embed/bootstrap`, stores Supabase `access_token` / `refresh_token`, then strips sensitive query params from the address bar.

Each client build only embeds **one** org API token in its JavaScript bundle.

## Production

Do **not** put the long-lived organisation API token in the iframe URL. Use a **partner BFF**: the LMS server calls MockThatInterview with the secret, receives a short-lived opaque token (or session) suitable for the iframe, and only that value appears in the browser.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_APP_FRONTEND_URL` | Base URL of the embedded MTI frontend (default `http://localhost:5173`) |
| `VITE_MTI_ORG_API_TOKEN` | Org `api_key` for bootstrap when running `dev:axia` or local Axia client build |
| `VITE_CYF_ORGANIZATION_ID` | CodeYourFuture `organizations.id` for `dev:cyf` / CYF Pages build |
| `VITE_MTI_API_BASE_URL` | Nest API root for `mti_api_base` (dev defaults to `http://localhost:8000`) |
| `VITE_PAGES_BASE` | Optional Pages `base` override when running `npm run build` locally |

## Adding a client

1. Add `src/clients/<slug>.js` and register it in `src/clients/index.js`.
2. Add the slug to `CLIENT_SLUGS` in `scripts/build-github-pages.mjs` and a card in `picker.html`.
3. Add a CI secret for that org’s API token and pass it in the build script for that slug only.
