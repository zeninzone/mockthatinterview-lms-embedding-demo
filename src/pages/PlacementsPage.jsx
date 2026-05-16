import { ArrowLeft, Building2, MapPin } from 'lucide-react';

const roles = [
  {
    company: 'Andela Talent Cloud',
    title: 'Product Designer II',
    location: 'Remote · Africa',
    type: 'Full-time',
    stage: 'Screening invites',
    match: '94%',
    tags: ['Figma', 'Design systems'],
  },
  {
    company: 'Paystack',
    title: 'Associate PM',
    location: 'Lagos / Hybrid',
    type: 'Full-time',
    stage: 'Take-home pending',
    match: '88%',
    tags: ['Metrics', 'APIs'],
  },
  {
    company: 'Moniepoint',
    title: 'UX Research Intern',
    location: 'Ibadan',
    type: '6-month pipeline',
    stage: 'Coffee chat booked',
    match: '81%',
    tags: ['Research ops'],
  },
  {
    company: 'M-KOPA Solar',
    title: 'Service Designer',
    location: 'Nairobi · Remote-first',
    type: 'Full-time',
    stage: 'New listing',
    match: '76%',
    tags: ['Field research'],
  },
];

export function PlacementsPage({ primaryColor, institutionName, onBackToPortal }) {
  return (
    <div className="page placementsPage">
      <button type="button" className="portalBackLink" onClick={onBackToPortal}>
        <ArrowLeft size={18} aria-hidden />
        Back to {institutionName}
      </button>
      <div className="pageHeader">
        <div>
          <h2 className="pageHeader__title">Placements & opportunities</h2>
          <p className="pageHeader__desc">Curated openings matched to cohort skills — sample data.</p>
        </div>
        <button type="button" className="btn btn--secondary">
          Submit CV for review
        </button>
      </div>

      <div className="roleGrid">
        {roles.map((r) => (
          <article key={`${r.company}-${r.title}`} className="roleCard">
            <header className="roleCard__head">
              <div className="roleCard__co">
                <Building2 size={20} aria-hidden />
                <span>{r.company}</span>
              </div>
              <span className="roleCard__pill" style={{ borderColor: primaryColor, color: primaryColor }}>
                {r.stage}
              </span>
            </header>
            <h3 className="roleCard__title">{r.title}</h3>
            <p className="roleCard__loc">
              <MapPin size={16} aria-hidden /> {r.location}
            </p>
            <p className="roleCard__type">{r.type}</p>
            <div className="roleCard__tags">
              {r.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="roleCard__foot">
              <span className="roleCard__match" style={{ color: primaryColor }}>
                Match score {r.match}
              </span>
              <button type="button" className="btn btn--primary btn--small">
                View detail
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
