import {
  Briefcase,
  LayoutDashboard,
  Mic,
  PanelLeftClose,
  Users,
  X,
} from 'lucide-react';

import { NAV_ITEMS } from '../nav';

const icons = { LayoutDashboard, Users, Mic, Briefcase };

export function Sidebar({
  institutionName,
  activeId,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="sidebarScrim"
          aria-label="Close menu"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__mark" aria-hidden />
          <div className="sidebar__brandText">
            <span className="sidebar__org">{institutionName}</span>
            <span className="sidebar__product">Learner portal</span>
          </div>
          <button
            type="button"
            className="sidebar__closeMobile iconButton"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = icons[item.icon];
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
              >
                <Icon size={20} strokeWidth={2} className="sidebar__linkIcon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__footerHint">
            <PanelLeftClose size={14} strokeWidth={2} aria-hidden />
            Demo LMS shell — embed lives under Interview practice.
          </p>
        </div>
      </aside>
    </>
  );
}
