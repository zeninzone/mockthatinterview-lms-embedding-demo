import { useState } from 'react';

export function InterviewPracticePage({
  isHostAuthenticated,
  org,
  student,
  simulateAuth,
  apiToken,
  frontendUrl,
  setFrontendUrl,
  apiBaseUrl,
  setApiBaseUrl,
  setApiToken,
  setOrg,
  setStudent,
  setAccessToken,
  setRefreshToken,
  setSimulateAuth,
  appliedIframeSrc,
  iframeLoadKey,
  accessToken,
  refreshToken,
  onLoadEmbed,
}) {
  const [isConfigOpen, setConfigOpen] = useState(true);

  return (
    <div className="page interviewPage">
      <div className="pageHeader">
        <div>
          <h2 className="pageHeader__title">Interview practice</h2>
          <p className="pageHeader__desc">
            MockThatInterview runs inside an iframe. Sign in as host from the top bar, configure fields, then load the
            embed.
          </p>
        </div>
      </div>

      <section className="panel panel--elevated configPanel">
        <button
          className="collapseToggle"
          type="button"
          onClick={() => setConfigOpen((open) => !open)}
          aria-expanded={isConfigOpen}
        >
          <span>Embed configuration</span>
          <span className="collapseToggle__chev">{isConfigOpen ? 'Hide' : 'Show'}</span>
        </button>
        {isConfigOpen ? (
          <>
            <p className="muted configPanel__intro">
              This demo loads MockThatInterview in an iframe. With an organisation API token set, the iframe URL
              includes <code>api_token</code> plus learner fields; the embedded app calls your Nest API (e.g.{' '}
              <code>http://localhost:8000</code> via <code>mti_api_base</code>) for <code>POST /embed/bootstrap</code>.
              For production, call the bootstrap API from your BFF only — never expose a long-lived API key in the
              iframe URL.{' '}
              <strong>Changes below apply only after you click “Load embed”.</strong>
            </p>
            {!apiToken.trim() ? (
              <p className="warningBanner">
                Set <code>VITE_MTI_ORG_API_TOKEN</code> in <code>.env.local</code> or paste your org API key below so the
                iframe can run <code>POST /embed/bootstrap</code>.
              </p>
            ) : null}
            <div className="configGrid">
              <label className="configGrid__full">
                MTI API base URL (Nest — <code>mti_api_base</code>; local default port 8000)
                <input
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                  spellCheck={false}
                />
              </label>
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
                <select value={org.theme} onChange={(e) => setOrg((prev) => ({ ...prev, theme: e.target.value }))}>
                  <option value="light">light</option>
                  <option value="dark">dark</option>
                </select>
              </label>
              <label>
                Logo URL
                <input value={org.logoUrl} onChange={(e) => setOrg((prev) => ({ ...prev, logoUrl: e.target.value }))} />
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
                <input value={student.email} onChange={(e) => setStudent((prev) => ({ ...prev, email: e.target.value }))} />
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

      <section className="panel panel--elevated embedPanel">
        <div className="embedHeader">
          <h2>Live embed</h2>
          <span className="embedHeader__status">
            {isHostAuthenticated ? 'Host session active' : 'Sign in as host to load the iframe'}
          </span>
        </div>
        {isHostAuthenticated ? (
          <div className="embedToolbar">
            <button className="btn btn--primary" type="button" onClick={onLoadEmbed}>
              Load embed
            </button>
            <span className="muted embedToolbar__hint">
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
    </div>
  );
}
