import { axiaAfricaClient } from './axia-africa.js';
import { codeyourfutureClient } from './codeyourfuture.js';

/** @type {Record<string, import('./types.js').ClientConfig>} */
export const CLIENTS = {
  [axiaAfricaClient.slug]: axiaAfricaClient,
  [codeyourfutureClient.slug]: codeyourfutureClient,
};

export const CLIENT_SLUGS = Object.keys(CLIENTS);

/** @type {import('./types.js').ClientConfig[]} */
export const CLIENT_LIST = CLIENT_SLUGS.map((slug) => CLIENTS[slug]);

/**
 * @param {string} slug
 * @returns {import('./types.js').ClientConfig | undefined}
 */
export function getClientConfig(slug) {
  return CLIENTS[slug];
}

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function resolveSlugFromPathname(pathname) {
  const match = pathname.match(/^\/([^/]+)/);
  const candidate = match?.[1];
  return candidate && CLIENTS[candidate] ? candidate : null;
}

/**
 * Active client: build-time `VITE_CLIENT_SLUG`, or in unified dev the URL path (`/<slug>/`).
 * @returns {import('./types.js').ClientConfig}
 */
export function getActiveClientConfig() {
  let slug = import.meta.env.VITE_CLIENT_SLUG?.trim() || '';

  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const pathSlug = resolveSlugFromPathname(window.location.pathname);
    if (pathSlug) slug = pathSlug;
  }

  if (!slug) {
    throw new Error(
      `No client selected. Open /${CLIENT_SLUGS.join('/ or /')}/ (npm run dev) or use dev:axia / dev:cyf.`,
    );
  }
  const config = getClientConfig(slug);
  if (!config) {
    throw new Error(`Unknown client slug: ${slug}. Valid: ${CLIENT_SLUGS.join(', ')}`);
  }
  return config;
}
