import React, { useMemo, useState } from 'react';
import UploadsPage from './UploadsPage';

function NavIcon({ name }) {
  const props = { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };
  const stroke = 'currentColor';
  const sw = 1.6;

  switch (name) {
    case 'All projects':
      return (
        <svg {...props}>
          <rect x="3" y="3.5" width="12" height="11" rx="2.2" stroke={stroke} strokeWidth={sw} />
          <path d="M5.5 7h7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5.5 10h5.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'NTRIP profiles':
      return (
        <svg {...props}>
          <path d="M9 3.2v11.6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5.2 6.2a5 5 0 0 1 7.6 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M6.6 8.7a3.2 3.2 0 0 1 4.8 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="9" cy="14.2" r="1.2" fill={stroke} />
        </svg>
      );
    case 'Code libraries':
      return (
        <svg {...props}>
          <rect x="3" y="3.5" width="12" height="11" rx="2.2" stroke={stroke} strokeWidth={sw} />
          <path d="M7.2 7.2 5.6 9l1.6 1.8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.8 7.2 12.4 9l-1.6 1.8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Map layers':
      return (
        <svg {...props}>
          <path
            d="M9 3.3 15 6.4 9 9.5 3 6.4 9 3.3Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M3.6 9.1 9 12 14.4 9.1" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.6 12 9 14.9 14.4 12" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Coordinate systems':
      return (
        <svg {...props}>
          <path d="M4 13.5h10" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5.5 12V4.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5.5 4.5h8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M12.6 4.5v6.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M10.6 10.7h4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'Team members':
      return (
        <svg {...props}>
          <circle cx="7" cy="7.2" r="2.3" stroke={stroke} strokeWidth={sw} />
          <path d="M3.8 14.6c.6-2.1 2-3.2 3.9-3.2 2 0 3.3 1.1 3.9 3.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="13.2" cy="7.8" r="1.7" stroke={stroke} strokeWidth={sw} opacity="0.9" />
        </svg>
      );
    case 'Plan & Billing':
      return (
        <svg {...props}>
          <rect x="3.4" y="4.2" width="11.2" height="9.8" rx="2.2" stroke={stroke} strokeWidth={sw} />
          <path d="M3.8 7.2h10.4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M6 11.2h3.8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'Settings':
      return (
        <svg {...props}>
          <path
            d="M9 4.2 10 3.7l1 1.1 1.4.2.2 1.4 1.1 1-.5 1.3.5 1.3-1.1 1-.2 1.4-1.4.2-1 1.1-1-.5-1 .5-1-1.1-1.4-.2-.2-1.4-1.1-1 .5-1.3-.5-1.3 1.1-1 .2-1.4 1.4-.2 1-1.1 1 .5Z"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="9" r="2" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case 'Recently deleted projects':
      return (
        <svg {...props}>
          <path d="M6.2 5.6h5.6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M7.2 5.6V4.4h3.6v1.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M5.4 5.6 6.1 14h5.8l.7-8.4" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "What's new":
      return (
        <svg {...props}>
          <path
            d="M9 2.8c-2.2 0-4 1.8-4 4v2.1c0 .5-.2 1-.6 1.3l-.6.5h10.4l-.6-.5c-.4-.3-.6-.8-.6-1.3V6.8c0-2.2-1.8-4-4-4Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M7.2 13.1c.3.9 1 1.5 1.8 1.5s1.5-.6 1.8-1.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'Documentation and Support':
      return (
        <svg {...props}>
          <path d="M5 4.2h7.2c.9 0 1.6.7 1.6 1.6v7.3c0 .9-.7 1.6-1.6 1.6H6.4c-.8 0-1.4-.6-1.4-1.4V4.2Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M6.2 6.3h5.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M6.2 8.7h4.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'Project exports':
      return (
        <svg {...props}>
          <path d="M5 12.8h8c.9 0 1.6-.7 1.6-1.6V6.1c0-.9-.7-1.6-1.6-1.6H5c-.9 0-1.6.7-1.6 1.6v5.1c0 .9.7 1.6 1.6 1.6Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M9 10.6V7.2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M7.2 8.8 9 7l1.8 1.8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <svg {...props} />;
  }
}

const NAV = [
  { type: 'item', label: 'All projects' },
  { type: 'section', label: 'Presets' },
  { type: 'item', label: 'NTRIP profiles' },
  { type: 'item', label: 'Code libraries' },
  { type: 'item', label: 'Map layers' },
  { type: 'item', label: 'Coordinate systems' },
  { type: 'section', label: 'Workspace' },
  { type: 'item', label: 'Team members' },
  { type: 'item', label: 'Plan & Billing' },
  { type: 'item', label: 'Settings' },
  { type: 'item', label: 'Recently deleted projects' },
  { type: 'item', label: 'Project exports', active: true },
  { type: 'section', label: 'Help' },
  { type: 'item', label: "What's new" },
  { type: 'item', label: 'Documentation and Support' },
];

export default function UploadsTab({ jobs = [], setUploadJobs }) {
  const [company] = useState('CompanyX');
  const activeCount = useMemo(() => jobs.filter((j) => j.status === 'running').length, [jobs]);

  return (
    <div className="uploads-tab">
      <aside className="nav-sidebar" aria-label="Navigation">
        <div className="nav-top">
          <div className="nav-company">
            <div className="nav-avatar" aria-hidden="true" />
            <div className="nav-company-name">{company}</div>
            <div className="nav-caret" aria-hidden="true">
              ▾
            </div>
          </div>
          <button className="nav-collapse" type="button" aria-label="Collapse">
            «
          </button>
        </div>

        <nav className="nav-list">
          {NAV.map((n) =>
            n.type === 'section' ? (
              <div key={n.label} className="nav-section">
                {n.label}
              </div>
            ) : (
              <button key={n.label} type="button" className={`nav-item ${n.active ? 'is-active' : ''}`}>
                <span className="nav-item-icon" aria-hidden="true">
                  <NavIcon name={n.label} />
                </span>
                <span className="nav-item-label">{n.label}</span>
                {n.label === "What's new" ? <span className="nav-dot-badge">1</span> : null}
                {n.label === 'Project exports' && activeCount ? (
                  <span className="nav-item-meta">
                    <span className="nav-exports-loader" aria-hidden="true" title="Export in progress" />
                    <span className="nav-pill">{activeCount}</span>
                  </span>
                ) : null}
              </button>
            )
          )}
        </nav>

        <div className="nav-bottom">
          <div className="nav-user">
            <div className="nav-user-avatar" aria-hidden="true">
              J
            </div>
            <div className="nav-user-info">
              <div className="nav-user-name">Jack Smith</div>
              <div className="nav-user-email">jaschxxxxx@gmail.com</div>
            </div>
            <div className="nav-user-next" aria-hidden="true">
              ›
            </div>
          </div>
          <div className="nav-footer-row">
            <button type="button" className="nav-footer-btn">
              English ▾
            </button>
            <button type="button" className="nav-footer-btn" aria-label="Theme">
              ◑
            </button>
          </div>
        </div>
      </aside>

      <main className="uploads-tab-main">
        <UploadsPage
          jobs={jobs}
          onCancelJob={(jobId) => setUploadJobs?.((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'cancelled' } : j)))}
        />
      </main>
    </div>
  );
}

