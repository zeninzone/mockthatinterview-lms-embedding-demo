import { ChevronRight, Clock, MessageCircle } from 'lucide-react';

const cohorts = [
  {
    name: 'Product Design — Spring ’26',
    track: 'UX / Research',
    learners: 52,
    lead: 'M. Adeyemi',
    progress: 78,
    next: 'Portfolio review labs',
    sync: 'Wed 09:00 WAT',
  },
  {
    name: 'Engineering Foundations',
    track: 'Full-stack',
    learners: 64,
    lead: 'J. Mensah',
    progress: 64,
    next: 'System design drills',
    sync: 'Tue & Fri 17:30 WAT',
  },
  {
    name: 'Career Accelerator',
    track: 'Interviews',
    learners: 36,
    lead: 'K. Osei',
    progress: 91,
    next: 'Offer negotiation clinic',
    sync: 'Thu 12:00 WAT',
  },
];

export function CohortsPage({ primaryColor }) {
  return (
    <div className="page cohortsPage">
      <div className="pageHeader">
        <div>
          <h2 className="pageHeader__title">Your cohorts</h2>
          <p className="pageHeader__desc">Synthetic data for this LMS demo — wire to your LMS API later.</p>
        </div>
        <button type="button" className="btn btn--secondary">
          Invite learner
        </button>
      </div>

      <div className="panel panel--elevated cohortList">
        <div className="cohortRow cohortRow--head">
          <span>Cohort</span>
          <span>Lead</span>
          <span>Learners</span>
          <span>Progress</span>
          <span>Next milestone</span>
          <span />
        </div>
        {cohorts.map((c) => (
          <div key={c.name} className="cohortRow">
            <div className="cohortRow__name">
              <strong>{c.name}</strong>
              <span className="cohortRow__track">{c.track}</span>
            </div>
            <span className="cohortRow__cell">{c.lead}</span>
            <span className="cohortRow__cell tabular">{c.learners}</span>
            <div className="cohortRow__progress">
              <div className="progressRing" style={{ '--p': c.progress, '--c': primaryColor }}>
                <span>{c.progress}%</span>
              </div>
            </div>
            <div className="cohortRow__next">
              <span>{c.next}</span>
              <span className="cohortRow__sync">
                <Clock size={14} />
                {c.sync}
              </span>
            </div>
            <button type="button" className="iconGhost" aria-label="Open cohort">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>

      <section className="panel composer">
        <h3 className="composer__title">
          <MessageCircle size={22} strokeWidth={2} />
          Cohort channel (preview)
        </h3>
        <p className="composer__hint">
          In a full LMS this would mirror Slack/Discord or in-app discussions. Embed demo learners still use Interview
          practice for MockThatInterview.
        </p>
        <textarea className="composer__input" rows={3} placeholder="Share an update with your cohort…" readOnly />
      </section>
    </div>
  );
}
