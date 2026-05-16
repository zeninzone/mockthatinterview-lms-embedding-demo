import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
