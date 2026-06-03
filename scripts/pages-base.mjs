/**
 * Shared GitHub Pages base path (must match vite.config.js).
 * @returns {string} trailing slash, e.g. `/mockthatinterview-lms-embedding-demo/`
 */
export function resolvePagesBase() {
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
