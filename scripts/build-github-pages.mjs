import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolvePagesBase } from './pages-base.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(scriptDir, '..');
const distRoot = path.join(repoRoot, 'dist');
const clients = ['axia-africa', 'codeyourfuture'];

function runViteBuild(env) {
  execSync('npx vite build', {
    cwd: repoRoot,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function rmDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

rmDir(distRoot);
fs.mkdirSync(distRoot, { recursive: true });

const pickerOut = path.join(repoRoot, '.build', 'picker');
rmDir(pickerOut);
runViteBuild({
  VITE_BUILD_TARGET: 'picker',
  VITE_OUT_DIR: '.build/picker',
});
copyDir(pickerOut, distRoot);
const pickerHtml = path.join(distRoot, 'picker.html');
const indexHtml = path.join(distRoot, 'index.html');
if (fs.existsSync(pickerHtml)) {
  fs.copyFileSync(pickerHtml, indexHtml);
}

for (const slug of clients) {
  const out = path.join(repoRoot, '.build', slug);
  rmDir(out);

  const env = {
    VITE_BUILD_TARGET: 'client',
    VITE_CLIENT_SLUG: slug,
    VITE_OUT_DIR: `.build/${slug}`,
  };

  if (slug === 'axia-africa') {
    env.VITE_MTI_ORG_API_TOKEN =
      process.env.MTI_ORG_API_TOKEN_AXIA ||
      process.env.VITE_MTI_ORG_API_TOKEN_AXIA ||
      process.env.VITE_MTI_ORG_API_TOKEN ||
      '';
  }

  if (slug === 'codeyourfuture') {
    env.VITE_MTI_ORG_API_TOKEN =
      process.env.MTI_ORG_API_TOKEN_CYF ||
      process.env.VITE_MTI_ORG_API_TOKEN_CYF ||
      '';
    env.VITE_CYF_ORGANIZATION_ID =
      process.env.VITE_CYF_ORGANIZATION_ID ||
      process.env.CYF_ORGANIZATION_ID ||
      '';
  }

  runViteBuild(env);
  copyDir(out, path.join(distRoot, slug));
}

const base = resolvePagesBase();
console.log(`\nGitHub Pages build complete (base: ${base})`);
console.log(`  Picker: ${base}`);
for (const slug of clients) {
  console.log(`  ${slug}: ${base}${slug}/`);
}
