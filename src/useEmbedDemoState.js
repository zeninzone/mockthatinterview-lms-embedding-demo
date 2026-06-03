import { useCallback, useState } from 'react';

import { getActiveClientConfig } from './clients';
import { buildEmbedContext } from './embedContext';

const clientConfig = getActiveClientConfig();

const DEFAULT_FRONTEND_URL =
  import.meta.env.VITE_APP_FRONTEND_URL || 'http://localhost:5173';

const DEFAULT_ORG_API_TOKEN =
  import.meta.env.VITE_MTI_ORG_API_TOKEN ||
  (clientConfig.slug === 'codeyourfuture'
    ? import.meta.env.VITE_MTI_ORG_API_TOKEN_CYF || ''
    : '');

/** Nest API base for `POST /embed/bootstrap` — passed as `mti_api_base` on the iframe URL (see mockthatinterview-frontend bootstrap). */
const DEFAULT_MTI_API_BASE =
  import.meta.env.VITE_MTI_API_BASE_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:8000' : '');

export function useEmbedDemoState() {
  const [frontendUrl, setFrontendUrl] = useState(DEFAULT_FRONTEND_URL);
  const [apiBaseUrl, setApiBaseUrl] = useState(DEFAULT_MTI_API_BASE);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [simulateAuth, setSimulateAuth] = useState(false);
  const [apiToken, setApiToken] = useState(DEFAULT_ORG_API_TOKEN);
  const [org, setOrg] = useState({
    organizationId: clientConfig.organizationId,
    ...clientConfig.org,
  });
  const [student, setStudent] = useState({ ...clientConfig.student });
  const [appliedIframeSrc, setAppliedIframeSrc] = useState('');
  const [iframeLoadKey, setIframeLoadKey] = useState(0);

  const buildIframeSrc = useCallback(() => {
    let base = frontendUrl.trim();
    if (!base) {
      base = DEFAULT_FRONTEND_URL;
    }

    const url = new URL(base);

    const trimmedToken = apiToken.trim();
    if (trimmedToken) {
      url.searchParams.set('api_token', trimmedToken);
      url.searchParams.set('external_user_id', student.externalUserId);
      url.searchParams.set('first_name', student.firstName);
      url.searchParams.set('last_name', student.lastName);
      if (student.email?.trim()) {
        url.searchParams.set('email', student.email.trim());
      }
    }

    const context = buildEmbedContext({
      embedIssuer: clientConfig.embedIssuer,
      ...org,
      ...student,
      accessToken,
      refreshToken,
      simulateAuth,
    });
    url.searchParams.set('mti_embed_context', context);

    const apiBase = apiBaseUrl.trim();
    if (apiBase) {
      url.searchParams.set('mti_api_base', apiBase);
    }

    return url.toString();
  }, [org, student, accessToken, refreshToken, frontendUrl, simulateAuth, apiToken, apiBaseUrl]);

  const handleLoadEmbed = useCallback(() => {
    try {
      setAppliedIframeSrc(buildIframeSrc());
      setIframeLoadKey((k) => k + 1);
      return true;
    } catch (err) {
      console.error(err);
      window.alert(
        'Could not build embed URL. Check that “MockThatInterview frontend URL” is a valid absolute URL (e.g. http://localhost:5173).',
      );
      return false;
    }
  }, [buildIframeSrc]);

  return {
    clientConfig,
    frontendUrl,
    setFrontendUrl,
    apiBaseUrl,
    setApiBaseUrl,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    simulateAuth,
    setSimulateAuth,
    apiToken,
    setApiToken,
    org,
    setOrg,
    student,
    setStudent,
    appliedIframeSrc,
    setAppliedIframeSrc,
    iframeLoadKey,
    setIframeLoadKey,
    buildIframeSrc,
    handleLoadEmbed,
  };
}
