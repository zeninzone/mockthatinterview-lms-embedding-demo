import { useCallback, useState } from 'react';
import { buildEmbedContext } from './embedContext';

const DEFAULT_FRONTEND_URL =
  import.meta.env.VITE_APP_FRONTEND_URL || 'http://localhost:5173';

const DEFAULT_ORG_API_TOKEN = import.meta.env.VITE_MTI_ORG_API_TOKEN || '';

export const App = () => {
  const [isHostAuthenticated, setHostAuthenticated] = useState(false);
  const [isConfigOpen, setConfigOpen] = useState(true);
  const [frontendUrl, setFrontendUrl] = useState(DEFAULT_FRONTEND_URL);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [simulateAuth, setSimulateAuth] = useState(false);
  const [apiToken, setApiToken] = useState(DEFAULT_ORG_API_TOKEN);
  const [org, setOrg] = useState({
    organizationId: 'cbbef415-de23-4b15-87f4-31827c6a6d5b',
    institutionName: 'Axia Africa',
    theme: 'light',
    logoUrl: 'https://placehold.co/120x40/047857/ffffff?text=Axia+Africa',
    primaryColor: '#047857',
  });
  const [student, setStudent] = useState({
    externalUserId: 'user-112233',
    email: 'ayayo@gmail.com',
    firstName: 'Ayomide',
    lastName: 'Adebisi',
  });

  /** Only updated when the user clicks “Load embed” — editing the form does not reload the iframe. */
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
      ...org,
      ...student,
      accessToken,
      refreshToken,
      simulateAuth,
    });
    url.searchParams.set('mti_embed_context', context);

    return url.toString();
  }, [
    org,
    student,
    accessToken,
    refreshToken,
    frontendUrl,
    simulateAuth,
    apiToken,
  ]);

  const handleLoadEmbed = () => {
    try {
      setAppliedIframeSrc(buildIframeSrc());
      setIframeLoadKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      window.alert(
        'Could not build embed URL. Check that “MockThatInterview frontend URL” is a valid absolute URL (e.g. http://localhost:5173).',
      );
    }
  };

  const handleToggleHost = () => {
    setHostAuthenticated((prev) => {
      const next = !prev;
      if (!next) {
        setAppliedIframeSrc('');
        setIframeLoadKey(0);
      }
      return next;
    });
  };

  return (
    <div className="portal">
      <aside className="sidebar">
        <div className="logo">{org.institutionName}</div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#cohorts">Cohorts</a>
          <a className="active" href="#interview-practice">Interview Practice</a>
          <a href="#placements">Placements</a>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <h1>Axia Africa — learner portal (embed demo)</h1>
          <button
            className="primaryButton"
            type="button"
            onClick={handleToggleHost}
          >
            {isHostAuthenticated ? 'Sign out host' : 'Sign in as host (simulate LMS session)'}
          </button>
        </header>

        <section className="panel">
          <button
            className="collapseToggle"
            type="button"
            onClick={() => setConfigOpen((open) => !open)}
            aria-expanded={isConfigOpen}
          >
            <span>Embed configuration</span>
            <span>{isConfigOpen ? 'Hide' : 'Show'}</span>
          </button>
          {isConfigOpen ? (
            <>
              <p className="muted">
                This demo loads MockThatInterview in an iframe. With an organisation API token set,
                the iframe URL includes <code>api_token</code> plus learner fields; the embedded app
                exchanges them with the MTI backend for a real Supabase session. For production, call
                the bootstrap API from your BFF only — never expose a long-lived API key in the iframe
                URL. <strong>Changes below apply only after you click “Load embed”.</strong>
              </p>
              {!apiToken.trim() ? (
                <p className="warningBanner">
                  Set <code>VITE_MTI_ORG_API_TOKEN</code> in <code>.env.local</code> or paste your org
                  API key below so the iframe can run <code>POST /embed/bootstrap</code>.
                </p>
              ) : null}
              <div className="grid">
                <label>
                  MockThatInterview frontend URL
                  <input value={frontendUrl} onChange={(e) => setFrontendUrl(e.target.value)} />
                </label>
                <label>
                  Organisation API token (dev only — see README)
                  <input
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>
                <label>
                  Organization ID (for branding context)
                  <input
                    value={org.organizationId}
                    onChange={(e) => setOrg((prev) => ({ ...prev, organizationId: e.target.value }))}
                  />
                </label>
                <label>
                  Institution name
                  <input
                    value={org.institutionName}
                    onChange={(e) => setOrg((prev) => ({ ...prev, institutionName: e.target.value }))}
                  />
                </label>
                <label>
                  Theme
                  <select
                    value={org.theme}
                    onChange={(e) => setOrg((prev) => ({ ...prev, theme: e.target.value }))}
                  >
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                  </select>
                </label>
                <label>
                  Logo URL
                  <input
                    value={org.logoUrl}
                    onChange={(e) => setOrg((prev) => ({ ...prev, logoUrl: e.target.value }))}
                  />
                </label>
                <label>
                  Primary color
                  <input
                    value={org.primaryColor}
                    onChange={(e) => setOrg((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  />
                </label>
                <label>
                  External user ID
                  <input
                    value={student.externalUserId}
                    onChange={(e) => setStudent((prev) => ({ ...prev, externalUserId: e.target.value }))}
                  />
                </label>
                <label>
                  First name
                  <input
                    value={student.firstName}
                    onChange={(e) => setStudent((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </label>
                <label>
                  Last name
                  <input
                    value={student.lastName}
                    onChange={(e) => setStudent((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </label>
                <label>
                  Email (optional — omit for anonymous-email bootstrap)
                  <input
                    value={student.email}
                    onChange={(e) => setStudent((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </label>
                <label>
                  Access token (optional — only if not using API bootstrap)
                  <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
                </label>
                <label>
                  Refresh token (optional)
                  <input value={refreshToken} onChange={(e) => setRefreshToken(e.target.value)} />
                </label>
                <label className="inline">
                  <input
                    checked={simulateAuth}
                    type="checkbox"
                    onChange={(e) => setSimulateAuth(e.target.checked)}
                  />
                  Simulate auth (local mock session; skipped when API bootstrap succeeds)
                </label>
              </div>
            </>
          ) : null}
        </section>

        <section className="embedPanel" id="interview-practice">
          <div className="embedHeader">
            <h2>Interview practice</h2>
            <span>{isHostAuthenticated ? 'Host session active' : 'Sign in as host to load the iframe'}</span>
          </div>
          {isHostAuthenticated ? (
            <div className="embedToolbar">
              <button className="primaryButton" type="button" onClick={handleLoadEmbed}>
                Load embed
              </button>
              <span className="muted">
                {appliedIframeSrc
                  ? 'Click again after changing fields to reload the iframe with the new URL.'
                  : 'Click to build the iframe URL and run bootstrap (no reload while you only edit fields).'}
              </span>
            </div>
          ) : null}
          {!isHostAuthenticated ? (
            <div className="emptyState">Sign in as host to render the embedded MockThatInterview experience.</div>
          ) : !appliedIframeSrc ? (
            <div className="emptyState">Click “Load embed” to open the iframe with the current configuration.</div>
          ) : (
            <iframe
              key={iframeLoadKey}
              title="MockThatInterview embedded"
              src={appliedIframeSrc}
              className="embedFrame"
              allow="clipboard-read; clipboard-write; microphone; on-device-speech-recognition"
            />
          )}
        </section>
      </main>
    </div>
  );
};
