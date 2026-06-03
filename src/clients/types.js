/**
 * @typedef {Object} ClientOrgDefaults
 * @property {string} institutionName
 * @property {'light' | 'dark'} theme
 * @property {string} logoUrl
 * @property {string} primaryColor
 */

/**
 * @typedef {Object} ClientStudentDefaults
 * @property {string} externalUserId
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @typedef {Object} ClientConfig
 * @property {string} slug
 * @property {string} displayName
 * @property {string} blurb
 * @property {string} embedIssuer
 * @property {string} organizationId
 * @property {ClientOrgDefaults} org
 * @property {ClientStudentDefaults} student
 */

export {};
