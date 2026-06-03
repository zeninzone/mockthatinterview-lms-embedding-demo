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
 * Active client for this Vite build (set via `VITE_CLIENT_SLUG`).
 * @returns {import('./types.js').ClientConfig}
 */
export function getActiveClientConfig() {
  const slug = import.meta.env.VITE_CLIENT_SLUG?.trim();
  if (!slug) {
    throw new Error(
      'VITE_CLIENT_SLUG is required for the LMS demo app. Use npm run dev:axia or dev:cyf.',
    );
  }
  const config = getClientConfig(slug);
  if (!config) {
    throw new Error(`Unknown client slug: ${slug}. Valid: ${CLIENT_SLUGS.join(', ')}`);
  }
  return config;
}
