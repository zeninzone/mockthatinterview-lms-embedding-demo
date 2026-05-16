import { NAV_ITEMS } from './nav';

const VALID_NAV_IDS = new Set(NAV_ITEMS.map((item) => item.id));

export function navIdFromHash(hash = window.location.hash) {
  const id = hash.replace(/^#/, '').trim();
  return VALID_NAV_IDS.has(id) ? id : 'dashboard';
}

export function setNavHash(navId) {
  const next = `#${navId}`;
  if (window.location.hash !== next) {
    window.location.hash = navId;
  }
}
