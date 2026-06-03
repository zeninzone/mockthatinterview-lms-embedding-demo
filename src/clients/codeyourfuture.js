/** @type {import('./types.js').ClientConfig} */
export const codeyourfutureClient = {
  slug: 'codeyourfuture',
  displayName: 'CodeYourFuture',
  blurb: 'Mock LMS shell for CodeYourFuture — free coding school for disadvantaged learners.',
  embedIssuer: 'cyf-lms-demo',
  organizationId:
    import.meta.env.VITE_CYF_ORGANIZATION_ID?.trim() ||
    '00000000-0000-0000-0000-000000000000',
  org: {
    institutionName: 'CodeYourFuture',
    theme: 'light',
    logoUrl: `${import.meta.env.BASE_URL}clients/codeyourfuture/logo.png`,
    primaryColor: '#d80f0f',
  },
  student: {
    externalUserId: 'cyf-demo-learner-001',
    email: 'learner.demo@codeyourfuture.io',
    firstName: 'Demo',
    lastName: 'Learner',
  },
};
