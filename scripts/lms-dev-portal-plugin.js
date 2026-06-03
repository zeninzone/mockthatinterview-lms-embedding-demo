/**
 * Dev-only: serve picker.html at `/` and mount each client app under `/<slug>/`.
 * Production still uses separate builds per client (see build-github-pages.mjs).
 */

const CLIENT_SLUGS = ['axia-africa', 'codeyourfuture'];

const ASSET_EXT =
  /\.(css|js|mjs|jsx|ts|tsx|map|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|webp|json)$/i;

function isViteInternal(pathname) {
  return (
    pathname.startsWith('/@') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/node_modules') ||
    pathname.startsWith('/clients/')
  );
}

/**
 * @returns {import('vite').Plugin}
 */
export function lmsDevPortalPlugin() {
  return {
    name: 'lms-dev-portal',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url ?? '/';
        const q = raw.indexOf('?');
        const pathname = q === -1 ? raw : raw.slice(0, q);
        const search = q === -1 ? '' : raw.slice(q);

        if (isViteInternal(pathname) || ASSET_EXT.test(pathname)) {
          return next();
        }

        if (pathname === '/' || pathname === '/index.html') {
          req.url = `/picker.html${search}`;
          return next();
        }

        for (const slug of CLIENT_SLUGS) {
          if (pathname === `/${slug}`) {
            res.statusCode = 302;
            res.setHeader('Location', `/${slug}/${search}`);
            res.end();
            return;
          }
          if (pathname === `/${slug}/` || pathname.startsWith(`/${slug}/`)) {
            req.url = `/index.html${search}`;
            return next();
          }
        }

        next();
      });
    },
  };
}
