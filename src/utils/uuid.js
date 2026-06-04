/** Standard UUID (8-4-4-4-12 hex). */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Keep only UUID-safe characters while typing. */
export function sanitizeUuidInput(raw) {
  return String(raw ?? '')
    .toLowerCase()
    .replace(/[^0-9a-f-]/g, '')
    .slice(0, 36);
}

export function isValidUuid(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed.length > 0 && UUID_REGEX.test(trimmed);
}

/** API keys use mti_ prefix — not organisation UUIDs. */
export function looksLikeApiKey(value) {
  const trimmed = String(value ?? '').trim();
  return trimmed.startsWith('mti_') && !UUID_REGEX.test(trimmed);
}
