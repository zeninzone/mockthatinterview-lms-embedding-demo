import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { lmsDevPortalPlugin } from './scripts/lms-dev-portal-plugin.js';
import { resolvePagesBase } from './scripts/pages-base.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const buildTarget = process.env.VITE_BUILD_TARGET;
const clientSlug = process.env.VITE_CLIENT_SLUG?.trim();
const repoBase = resolvePagesBase();

/** `npm run dev` — picker at `/`, clients at `/<slug>/` */
const unifiedDev = !buildTarget && !clientSlug;

const base =
  buildTarget === 'picker'
    ? repoBase
    : clientSlug
      ? `${repoBase}${clientSlug}/`
      : unifiedDev
        ? '/'
        : repoBase;

const outDir = process.env.VITE_OUT_DIR || 'dist';

const input =
  buildTarget === 'picker'
    ? resolve(__dirname, 'picker.html')
    : resolve(__dirname, 'index.html');

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react(), ...(unifiedDev ? [lmsDevPortalPlugin()] : [])],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
  server: {
    port: 4174,
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
