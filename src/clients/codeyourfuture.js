/** @type {import('./types.js').ClientConfig} */
export const codeyourfutureClient = {
  slug: 'codeyourfuture',
  displayName: 'CodeYourFuture',
  blurb: 'Mock LMS shell for CodeYourFuture — free coding school for disadvantaged learners.',
  embedIssuer: 'cyf-lms-demo',
  organizationId: import.meta.env.VITE_CYF_ORGANIZATION_ID?.trim() || '',
  org: {
    institutionName: 'CodeYourFuture',
    theme: 'light',
    logoUrl: `${import.meta.env.BASE_URL}clients/codeyourfuture/logo.png`,
    primaryColor: '#d80f0f',
  },
  student: {
    externalUserId: 'cyf-john-doe-001',
    email: 'john.doe@codeyourfuture.io',
    firstName: 'John',
    lastName: 'Doe',
  },
};
