/**
 * @param {string} value
 * @param {string} fallback
 */
function slugifyPart(value, fallback) {
  const slug = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || fallback;
}

/**
 * CYF LMS external learner id: cyf-first-last-001
 * @param {string} firstName
 * @param {string} lastName
 */
export function generateCyfExternalUserId(firstName, lastName) {
  const first = slugifyPart(firstName, 'learner');
  const last = slugifyPart(lastName, 'user');
  return `cyf-${first}-${last}-001`;
}
