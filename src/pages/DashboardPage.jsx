import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ClipboardList,
  Mic,
  TrendingUp,
  Users,
} from 'lucide-react';

const announcements = [
  {
    title: 'Career week kicks off Feb 24',
    body: 'Workshops with partner employers and a live AMA with alumni.',
    tag: 'Event',
  },
  {
    title: 'Interview lab hours extended',
    body: 'Mock sessions now available Tues & Thu evenings (WAT).',
    tag: 'Update',
  },
];

const milestones = [
  { label: 'Complete onboarding checklist', due: 'Jan 28', pct: 100 },
  { label: 'Submit capstone outline', due: 'Feb 5', pct: 60 },
  { label: 'First mock interview (AI)', due: 'Feb 12', pct: 0 },
];

export function DashboardPage({ primaryColor }) {
  return (
    <div className="page dashboard">
      <section className="heroCard" style={{ borderLeftColor: primaryColor }}>
        <div className="heroCard__copy">
          <p className="heroCard__eyebrow">Good afternoon</p>
          <h2 className="heroCard__title">Welcome back — here’s what’s happening this week</h2>
          <p className="heroCard__subtitle">
            Your cohort&apos;s pacing is ahead of schedule. Finish your interview warmup to unlock personalised
            human feedback slots.
          </p>
          <button type="button" className="btn btn--ghost btn--compact">
            View learning plan <ArrowRight size={16} />
          </button>
        </div>
        <div className="heroCard__badge" aria-hidden>
          <TrendingUp size={28} />
        </div>
      </section>

      <section className="statGrid">
        <article className="statCard">
          <div className="statCard__icon" style={{ background: `${primaryColor}18`, color: primaryColor }}>
            <BookOpen size={22} />
          </div>
          <span className="statCard__value">82%</span>
          <span className="statCard__label">Program progress</span>
          <span className="statCard__hint">+6% vs last month</span>
        </article>
        <article className="statCard">
          <div className="statCard__icon" style={{ background: `${primaryColor}18`, color: primaryColor }}>
            <Mic size={22} />
          </div>
          <span className="statCard__value">14</span>
          <span className="statCard__label">Practice sessions</span>
          <span className="statCard__hint">AI + human combined</span>
        </article>
        <article className="statCard">
          <div className="statCard__icon" style={{ background: `${primaryColor}18`, color: primaryColor }}>
            <Users size={22} />
          </div>
          <span className="statCard__value">48</span>
          <span className="statCard__label">Cohort mates</span>
          <span className="statCard__hint">Product design track</span>
        </article>
        <article className="statCard">
          <div className="statCard__icon" style={{ background: `${primaryColor}18`, color: primaryColor }}>
            <Award size={22} />
          </div>
          <span className="statCard__value">5</span>
          <span className="statCard__label">Credentials earned</span>
          <span className="statCard__hint">Badges this quarter</span>
        </article>
      </section>

      <div className="dashGrid">
        <section className="panel panel--elevated">
          <div className="panel__head">
            <h3 className="panel__title">
              <ClipboardList size={20} strokeWidth={2} />
              Upcoming milestones
            </h3>
          </div>
          <ul className="milestoneList">
            {milestones.map((m) => (
              <li key={m.label} className="milestoneList__item">
                <div className="milestoneList__meta">
                  <span className="milestoneList__label">{m.label}</span>
                  <span className="milestoneList__due">
                    <Calendar size={14} />
                    {m.due}
                  </span>
                </div>
                <div className="progressBar">
                  <div className="progressBar__fill" style={{ width: `${m.pct}%`, background: primaryColor }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel panel--elevated">
          <div className="panel__head">
            <h3 className="panel__title">Announcements</h3>
            <button type="button" className="linkButton">
              See all
            </button>
          </div>
          <ul className="announceList">
            {announcements.map((a) => (
              <li key={a.title} className="announceCard">
                <span className="announceCard__tag">{a.tag}</span>
                <strong className="announceCard__title">{a.title}</strong>
                <p className="announceCard__body">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
