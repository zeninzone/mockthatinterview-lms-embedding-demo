import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CohortsPage } from './pages/CohortsPage';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewPracticePage } from './pages/InterviewPracticePage';
import { PlacementsPage } from './pages/PlacementsPage';
import { navIdFromHash, setNavHash } from './hashNav';
import { useEmbedDemoState } from './useEmbedDemoState';

function learnerInitials(firstName, lastName) {
  const a = String(firstName ?? '').trim().charAt(0);
  const b = String(lastName ?? '').trim().charAt(0);
  const s = `${a}${b}`.toUpperCase();
  return s || '···';
}

export const App = () => {
  const embed = useEmbedDemoState();
  const [nav, setNav] = useState(() => navIdFromHash());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHostAuthenticated, setHostAuthenticated] = useState(false);
  const [interviewPracticeStep, setInterviewPracticeStep] = useState('setup');

  const primary = embed.org.primaryColor || '#047857';

  useEffect(() => {
    const onHashChange = () => setNav(navIdFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (nav !== 'interview') {
      setInterviewPracticeStep('setup');
    }
  }, [nav]);

  const handleToggleHost = () => {
    setHostAuthenticated((prev) => {
      const next = !prev;
      if (!next) {
        embed.setAppliedIframeSrc('');
        embed.setIframeLoadKey(0);
        setInterviewPracticeStep('setup');
      }
      return next;
    });
  };

  /** One flush: host demo on + iframe URL + step 2 together (avoid half-applied intermediate state). */
  const enterInterviewPracticeSession = useCallback(() => {
    let ok = false;
    flushSync(() => {
      setHostAuthenticated(true);
      ok = embed.handleLoadEmbed();
      if (!ok) {
        setHostAuthenticated(false);
        return;
      }
      setInterviewPracticeStep('session');
    });
    return ok;
  }, [embed]);

  const resetInterviewPracticeSession = useCallback(() => {
    flushSync(() => {
      embed.setAppliedIframeSrc('');
      embed.setIframeLoadKey(0);
      setHostAuthenticated(false);
      setInterviewPracticeStep('setup');
    });
  }, [embed]);

  const backToPortal = useCallback(() => {
    flushSync(() => {
      embed.setAppliedIframeSrc('');
      embed.setIframeLoadKey(0);
      setInterviewPracticeStep('setup');
      setNav('dashboard');
      setNavHash('dashboard');
    });
  }, [embed]);

  const immersivePractice = nav === 'interview' && interviewPracticeStep === 'session';
  const interviewSetupChrome = nav === 'interview' && interviewPracticeStep === 'setup';

  const handleNavigate = (id) => {
    setNav(id);
    setNavHash(id);
    setMobileNavOpen(false);
    if (id !== 'interview') {
      setInterviewPracticeStep('setup');
    }
  };

  const main =
    nav === 'dashboard' ? (
      <DashboardPage primaryColor={primary} />
    ) : nav === 'cohorts' ? (
      <CohortsPage primaryColor={primary} />
    ) : nav === 'interview' ? (
      <InterviewPracticePage
        practiceStep={interviewPracticeStep}
        onPracticeStepChange={setInterviewPracticeStep}
        onPrepareAndEnterPractice={enterInterviewPracticeSession}
        onResetPracticeSession={resetInterviewPracticeSession}
        onBackToPortal={backToPortal}
        institutionName={embed.org.institutionName}
        org={embed.org}
        student={embed.student}
        accessToken={embed.accessToken}
        refreshToken={embed.refreshToken}
        simulateAuth={embed.simulateAuth}
        apiToken={embed.apiToken}
        frontendUrl={embed.frontendUrl}
        setFrontendUrl={embed.setFrontendUrl}
        apiBaseUrl={embed.apiBaseUrl}
        setApiBaseUrl={embed.setApiBaseUrl}
        setApiToken={embed.setApiToken}
        setOrg={embed.setOrg}
        setStudent={embed.setStudent}
        setAccessToken={embed.setAccessToken}
        setRefreshToken={embed.setRefreshToken}
        setSimulateAuth={embed.setSimulateAuth}
        appliedIframeSrc={embed.appliedIframeSrc}
        iframeLoadKey={embed.iframeLoadKey}
      />
    ) : (
      <PlacementsPage
        primaryColor={primary}
        institutionName={embed.org.institutionName}
        onBackToPortal={() => handleNavigate('dashboard')}
      />
    );

  const rootClass = ['lms-root'];
  if (immersivePractice) {
    rootClass.push('lms-root--practiceSessionRoot');
  } else if (interviewSetupChrome) {
    rootClass.push('lms-root--embedRoute');
  }

  let mainScrollClass = 'lms-scroll';
  if (immersivePractice) {
    mainScrollClass += ' lms-scroll--practiceSession';
  } else if (interviewSetupChrome) {
    mainScrollClass += ' lms-scroll--embedFill';
  }

  return (
    <div className={rootClass.join(' ')} style={{ '--lms-primary': primary }}>
      {!immersivePractice ? (
        <Sidebar
          institutionName={embed.org.institutionName}
          activeId={nav}
          onNavigate={handleNavigate}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      ) : null}
      <div className="lms-main">
        {!immersivePractice ? (
          <TopBar
            dense={interviewSetupChrome}
            activeId={nav}
            institutionName={embed.org.institutionName}
            isHostAuthenticated={isHostAuthenticated}
            onToggleHost={handleToggleHost}
            userInitials={learnerInitials(embed.student.firstName, embed.student.lastName)}
            onOpenNav={() => setMobileNavOpen(true)}
          />
        ) : null}
        <main className={mainScrollClass}>{main}</main>
      </div>
    </div>
  );
};
