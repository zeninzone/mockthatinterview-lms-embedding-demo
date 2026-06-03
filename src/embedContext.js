const toBase64Url = (input) => {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

export const buildEmbedContext = ({
  embedIssuer,
  organizationId,
  institutionName,
  theme,
  logoUrl,
  primaryColor,
  externalUserId,
  email,
  firstName,
  lastName,
  accessToken,
  refreshToken,
  simulateAuth,
}) => {
  const context = {
    issuer: embedIssuer,
    audience: 'mockthatinterview-embed',
    organizationId,
    accessToken: accessToken || undefined,
    refreshToken: refreshToken || undefined,
    simulateAuth,
    user: {
      id: externalUserId,
      externalUserId,
      email,
      firstName,
      lastName,
    },
    branding: {
      institutionName,
      theme,
      logoUrl,
      primaryColor,
    },
  };

  return toBase64Url(JSON.stringify(context));
};
