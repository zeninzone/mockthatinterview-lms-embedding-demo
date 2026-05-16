import { ArrowLeft } from 'lucide-react';

export function InterviewPracticePage({
  practiceStep,
  onPracticeStepChange,
  onPrepareAndEnterPractice,
  onResetPracticeSession,
  institutionName,
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
}) {
  const handleContinue = () => {
    onPrepareAndEnterPractice();
  };

  if (practiceStep === 'session') {
    return (
      <div className="embedPractice">
        <header className="embedPractice__bar">
          <button
            type="button"
            className="embedPractice__back iconButton"
            onClick={() => onPracticeStepChange('setup')}
            aria-label="Back to setup"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="embedPractice__context">{institutionName}</span>
          <div className="embedPractice__actions">
            <button type="button" className="btn btn--secondary btn--small" onClick={onResetPracticeSession}>
              Sign out & exit
            </button>
          </div>
        </header>
        <div className="embedPractice__viewport">
          {!appliedIframeSrc ? (
            <div className="embedPractice__fallback">
              <p>No iframe URL loaded. Go back and continue from setup.</p>
              <button type="button" className="btn btn--primary" onClick={() => onPracticeStepChange('setup')}>
                Back to setup
              </button>
            </div>
          ) : (
            <iframe
              key={iframeLoadKey}
              title="MockThatInterview practice"
              src={appliedIframeSrc}
              className="embedPractice__frame"
              allow="clipboard-read; clipboard-write; microphone; on-device-speech-recognition"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page interviewSetupPage">
      <div className="pageHeader setupHeader">
        <div>
          <h1 className="pageHeader__title setupHeader__title">Interview practice</h1>
          <p className="pageHeader__desc setupHeader__lead">
            Step 1 of 2 — configure how we open practice for learners. Step 2 is the full-screen practice experience without
            this setup UI.
          </p>
        </div>
      </div>

      <section className="panel panel--elevated setupConfigPanel">
        <h3 className="setupConfigPanel__heading">Embed configuration</h3>
        <p className="muted configPanel__intro">
          With an organisation API token set, the practice URL includes <code>api_token</code> plus learner fields; the
          app calls your Nest API (e.g. <code>http://localhost:8000</code> via <code>mti_api_base</code>) for{' '}
          <code>POST /embed/bootstrap</code>. For production use a partner BFF — never ship a long-lived key in browser
          URLs.
        </p>
        {!apiToken.trim() ? (
          <p className="warningBanner">
            Set <code>VITE_MTI_ORG_API_TOKEN</code> in <code>.env.local</code> or paste your org API key below so
            bootstrap can run.
          </p>
        ) : null}
        <div className="configGrid">
          <label className="configGrid__full">
            MTI API base URL (Nest — <code>mti_api_base</code>)
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
            Organisation API token (dev only)
            <input
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label>
            Organization ID (branding context)
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
            <input value={student.firstName} onChange={(e) => setStudent((prev) => ({ ...prev, firstName: e.target.value }))} />
          </label>
          <label>
            Last name
            <input value={student.lastName} onChange={(e) => setStudent((prev) => ({ ...prev, lastName: e.target.value }))} />
          </label>
          <label>
            Email (optional — omit for anonymous-email bootstrap)
            <input value={student.email} onChange={(e) => setStudent((prev) => ({ ...prev, email: e.target.value }))} />
          </label>
          <label>
            Access token (optional)
            <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
          </label>
          <label>
            Refresh token (optional)
            <input value={refreshToken} onChange={(e) => setRefreshToken(e.target.value)} />
          </label>
          <label className="inline">
            <input checked={simulateAuth} type="checkbox" onChange={(e) => setSimulateAuth(e.target.checked)} />
            Simulate auth (local mock session; skipped when API bootstrap succeeds)
          </label>
        </div>

        <div className="setupWizardActions">
          <div className="setupWizardActions__copy">
            <span className="setupWizardActions__badge">Step 2</span>
            <p className="muted setupWizardActions__hint">
              <strong>Sign in & start practice</strong> turns on the demo LMS host session, builds your iframe URL, and
              opens full-screen practice in one step. Use <strong>Sign out</strong> in the header here, or <strong>
                Sign out & exit
              </strong>{' '}
              on the practice strip, to reset.
            </p>
          </div>
          <button className="btn btn--primary setupWizardActions__cta" type="button" onClick={handleContinue}>
            Sign in & start practice
          </button>
        </div>
      </section>
    </div>
  );
}
