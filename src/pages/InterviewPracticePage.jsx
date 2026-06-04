import { ArrowLeft } from 'lucide-react';
import { flushSync } from 'react-dom';

import { getActiveClientConfig } from '../clients';
import { generateCyfExternalUserId } from '../utils/cyfExternalUserId';
import { isValidUuid, looksLikeApiKey, sanitizeUuidInput } from '../utils/uuid';

const clientConfig = getActiveClientConfig();
const isCyfDemo = clientConfig.slug === 'codeyourfuture';
const showApiTokenWarning = !isCyfDemo;

function ConfigSection({ description, variant, children }) {
  return (
    <div className={`setupConfigSection setupConfigSection--${variant}`}>
      {description ? <p className="muted setupConfigSection__lead">{description}</p> : null}
      <div className="configGrid">{children}</div>
    </div>
  );
}

export function InterviewPracticePage({
  practiceStep,
  onPracticeStepChange,
  onPrepareAndEnterPractice,
  onResetPracticeSession,
  onBackToPortal,
  institutionName,
  org,
  student,
  apiToken,
  frontendUrl,
  setFrontendUrl,
  setApiToken,
  setOrg,
  setStudent,
  accessToken,
  refreshToken,
  simulateAuth,
  setAccessToken,
  setRefreshToken,
  setSimulateAuth,
  appliedIframeSrc,
  iframeLoadKey,
}) {
  const lockedFieldClass = isCyfDemo ? 'field--locked' : undefined;

  function syncCyfExternalUserId(firstName, lastName) {
    setStudent((prev) => ({
      ...prev,
      externalUserId: generateCyfExternalUserId(firstName, lastName),
    }));
  }

  const fixedFields = (
    <>
      <label className={lockedFieldClass}>
        MockThatInterview frontend URL
        <input
          value={frontendUrl}
          onChange={(e) => setFrontendUrl(e.target.value)}
          readOnly={isCyfDemo}
        />
      </label>
      {isCyfDemo ? (
        <label className={lockedFieldClass}>
          Organisation name
          <input value={org.institutionName} readOnly />
        </label>
      ) : null}
      <label className={lockedFieldClass}>
        Theme
        <select
          value={org.theme}
          onChange={(e) => setOrg((prev) => ({ ...prev, theme: e.target.value }))}
          disabled={isCyfDemo}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>
      <label className={lockedFieldClass}>
        Logo URL
        <input
          value={org.logoUrl}
          onChange={(e) => setOrg((prev) => ({ ...prev, logoUrl: e.target.value }))}
          readOnly={isCyfDemo}
        />
      </label>
      <label className={lockedFieldClass}>
        Primary color
        <input
          value={org.primaryColor}
          onChange={(e) => setOrg((prev) => ({ ...prev, primaryColor: e.target.value }))}
          readOnly={isCyfDemo}
        />
      </label>
    </>
  );

  const editableFields = (
    <>
      {!isCyfDemo ? (
        <label>
          MockThatInterview frontend URL
          <input value={frontendUrl} onChange={(e) => setFrontendUrl(e.target.value)} />
        </label>
      ) : null}
      <label>
        <span className="fieldLabel">Organisation API token (dev only)</span>
        <input
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="mti_sk_..."
          title="Organisation API key from admin (starts with mti_). Not the organisation UUID."
        />
        <span className="fieldHint muted">
          Paste the <strong>API key</strong> from admin (<code>mti_sk_...</code>), not the organisation UUID.
        </span>
      </label>
      <label>
        <span className="fieldLabel">Organization ID (branding context)</span>
        <input
          value={org.organizationId}
          onChange={(e) =>
            setOrg((prev) => ({
              ...prev,
              organizationId: sanitizeUuidInput(e.target.value),
            }))
          }
          placeholder="550e8400-e29b-41d4-a716-446655440000"
          pattern="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"
          title="Organisation UUID from admin — not the API key"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
        />
      </label>
      {!isCyfDemo ? (
        <label>
          Institution name
          <input
            value={org.institutionName}
            onChange={(e) => setOrg((prev) => ({ ...prev, institutionName: e.target.value }))}
          />
        </label>
      ) : null}
      {!isCyfDemo ? (
        <>
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
        </>
      ) : null}
      <div className="configGrid__nameRow">
        <label>
          First name
          <input
            value={student.firstName}
            onChange={(e) =>
              setStudent((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            onBlur={
              isCyfDemo
                ? (e) => syncCyfExternalUserId(e.target.value, student.lastName)
                : undefined
            }
          />
        </label>
        <label>
          Last name
          <input
            value={student.lastName}
            onChange={(e) =>
              setStudent((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            onBlur={
              isCyfDemo
                ? (e) => syncCyfExternalUserId(student.firstName, e.target.value)
                : undefined
            }
          />
        </label>
      </div>
      <label className={isCyfDemo ? lockedFieldClass : undefined}>
        External user ID
        <input
          value={student.externalUserId}
          onChange={(e) => setStudent((prev) => ({ ...prev, externalUserId: e.target.value }))}
          readOnly={isCyfDemo}
        />
      </label>
      <label>
        Email (optional — omit for anonymous-email bootstrap)
        <input value={student.email} onChange={(e) => setStudent((prev) => ({ ...prev, email: e.target.value }))} />
      </label>
      {!isCyfDemo ? (
        <>
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
        </>
      ) : null}
    </>
  );

  const handleContinue = () => {
    const trimmedToken = apiToken.trim();
    if (trimmedToken && !looksLikeApiKey(trimmedToken)) {
      window.alert(
        'Organisation API token must start with mti_ (e.g. mti_sk_...). Use the API key from admin, not the organisation UUID.',
      );
      return;
    }
    if (!isValidUuid(org.organizationId)) {
      window.alert(
        'Organization ID must be a valid UUID (e.g. 550e8400-e29b-41d4-a716-446655440000). Copy it from the organisation record in admin.',
      );
      return;
    }
    if (isCyfDemo) {
      flushSync(() => {
        setStudent((prev) => ({
          ...prev,
          externalUserId: generateCyfExternalUserId(prev.firstName, prev.lastName),
        }));
      });
    }
    onPrepareAndEnterPractice();
  };

  if (practiceStep === 'session') {
    return (
      <div className="embedPractice">
        <header className="embedPractice__bar">
          <button
            type="button"
            className="embedPractice__back"
            onClick={onBackToPortal}
            aria-label={`Back to ${institutionName}`}
          >
            <ArrowLeft size={18} aria-hidden />
            <span>Back to {institutionName}</span>
          </button>
          <span className="embedPractice__context" aria-hidden>
            Practice
          </span>
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
        {!isCyfDemo ? (
          <p className="muted configPanel__intro">
            With an organisation API token set, the practice URL includes <code>api_token</code> plus learner fields; the
            app calls your Nest API (e.g. <code>http://localhost:8000</code> via <code>mti_api_base</code>) for{' '}
            <code>POST /embed/bootstrap</code>. For production use a partner BFF — never ship a long-lived key in browser
            URLs.
          </p>
        ) : null}
        {showApiTokenWarning && !apiToken.trim() ? (
          <p className="warningBanner">
            Set <code>VITE_MTI_ORG_API_TOKEN</code> in <code>.env.local</code> or paste your org API key below so
            bootstrap can run.
          </p>
        ) : null}

        {isCyfDemo ? (
          <div className="setupConfigSections">
            <ConfigSection
              description="Branding and platform settings for CodeYourFuture — preset for this demo."
              variant="fixed"
            >
              {fixedFields}
            </ConfigSection>
            <ConfigSection
              description="Organisation and learner details before starting practice."
              variant="editable"
            >
              {editableFields}
            </ConfigSection>
          </div>
        ) : (
          <div className="configGrid">{editableFields}</div>
        )}

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
