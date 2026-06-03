import { Bell, Menu } from 'lucide-react';

import { NAV_TITLES } from '../nav';

export function TopBar({
  activeId,
  institutionName,
  isHostAuthenticated,
  onPrimaryAction,
  onOpenNav,
  userInitials,
  dense,
}) {
  const title = NAV_TITLES[activeId] ?? 'Portal';

  return (
    <header className={`topbar ${dense ? 'topbar--embedDense' : ''}`}>
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu iconButton"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
        <div className="topbar__titles">
          <span className="topbar__crumb">{institutionName}</span>
          <h1 className="topbar__title">{title}</h1>
        </div>
      </div>

      <div className="topbar__right">
        <button type="button" className="topbar__iconBtn" aria-label="Notifications (demo)">
          <Bell size={20} />
          <span className="topbar__dot" />
        </button>
        <div className="topbar__avatar" title="Demo learner">
          {userInitials}
        </div>
        <button className="btn btn--primary" type="button" onClick={onPrimaryAction}>
          {isHostAuthenticated ? 'Sign out' : 'Go to Interview practice'}
        </button>
      </div>
    </header>
  );
}
