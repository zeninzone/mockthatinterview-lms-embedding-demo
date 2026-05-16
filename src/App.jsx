import { useState } from 'react';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CohortsPage } from './pages/CohortsPage';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewPracticePage } from './pages/InterviewPracticePage';
import { PlacementsPage } from './pages/PlacementsPage';
import { useEmbedDemoState } from './useEmbedDemoState';

function learnerInitials(firstName, lastName) {
  const a = String(firstName ?? '').trim().charAt(0);
  const b = String(lastName ?? '').trim().charAt(0);
  const s = `${a}${b}`.toUpperCase();
  return s || '···';
}

export const App = () => {
  const embed = useEmbedDemoState();
  const [nav, setNav] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHostAuthenticated, setHostAuthenticated] = useState(false);

  const primary = embed.org.primaryColor || '#047857';

  const handleToggleHost = () => {
    setHostAuthenticated((prev) => {
      const next = !prev;
      if (!next) {
        embed.setAppliedIframeSrc('');
        embed.setIframeLoadKey(0);
      }
      return next;
    });
  };

  const main =
    nav === 'dashboard' ? (
      <DashboardPage primaryColor={primary} />
    ) : nav === 'cohorts' ? (
      <CohortsPage primaryColor={primary} />
    ) : nav === 'interview' ? (
      <InterviewPracticePage
        isHostAuthenticated={isHostAuthenticated}
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
        onLoadEmbed={embed.handleLoadEmbed}
      />
    ) : (
      <PlacementsPage primaryColor={primary} />
    );

  return (
    <div className="lms-root" style={{ '--lms-primary': primary }}>
      <Sidebar
        institutionName={embed.org.institutionName}
        activeId={nav}
        onNavigate={setNav}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      <div className="lms-main">
        <TopBar
          activeId={nav}
          institutionName={embed.org.institutionName}
          isHostAuthenticated={isHostAuthenticated}
          onToggleHost={handleToggleHost}
          userInitials={learnerInitials(embed.student.firstName, embed.student.lastName)}
          onOpenNav={() => setMobileNavOpen(true)}
        />
        <main className="lms-scroll">{main}</main>
      </div>
    </div>
  );
};
