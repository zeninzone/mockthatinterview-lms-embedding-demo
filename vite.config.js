import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Resolve Vite `base` for static hosting.
 * - Local / non-CI builds: `/`
 * - GitHub Actions: `GITHUB_REPOSITORY` is `owner/repo` → project Pages use `/repo/`;
 *   repos named `owner.github.io` (user/org site) use `/`
 * - Override anytime: `VITE_PAGES_BASE=/my-subpath/` (must start and end with `/` for subpaths)
 */
function resolveBase() {
  const manual = process.env.VITE_PAGES_BASE;
  if (manual) {
    return manual.endsWith('/') ? manual : `${manual}/`;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) return '/';
  const [owner, name] = repo.split('/');
  if (!owner || !name) return '/';
  if (name === `${owner}.github.io`) return '/';
  return `/${name}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  server: {
    port: 4174,
    // Chromium: cross-origin iframes need mic / on-device-speech delegated to the child's origin here
    // and on the iframe's `allow` attribute. Tune origins for staging/production (see iframe `allow`).
    headers: {
      'Permissions-Policy':
        'microphone=(self "http://localhost:5173" "http://127.0.0.1:5173"), on-device-speech-recognition=(self "http://localhost:5173" "http://127.0.0.1:5173")',
    },
  },
  preview: {
    port: 4174,
    headers: {
      'Permissions-Policy':
        'microphone=(self "http://localhost:5173" "http://127.0.0.1:5173"), on-device-speech-recognition=(self "http://localhost:5173" "http://127.0.0.1:5173")',
    },
  },
});
