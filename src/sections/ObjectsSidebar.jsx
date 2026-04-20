import React from 'react';

export default function ObjectsSidebar({
  points,
  selectedMode,
  selectedPointId,
  onSelectPoint,
  uploadJobs = [],
  uploadsCount = 0,
  onOpenUploads,
}) {
  const dateLabel = '20 Apr 2026';

  return (
    <aside className="left">
      <div className="objects-v2">
        <div className="objects-v2-topbar">
          <div className="objects-v2-topbar-title">Objects</div>
          <div className="objects-v2-topbar-actions">
            <button type="button" className="objects-v2-topbar-btn" aria-label="Menu">
              <span className="objects-v2-burger" aria-hidden="true" />
            </button>
            <button type="button" className="objects-v2-topbar-btn" aria-label="Add">
              <span className="objects-v2-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="objects-v2-topbar-divider" aria-hidden="true" />

        <div className="objects-v2-search">
          <div className="objects-v2-search-icon" aria-hidden="true" />
          <input className="objects-v2-search-input" placeholder="Search" />
        </div>

        {uploadsCount ? (
          <button className="uploads-link-row" type="button" onClick={onOpenUploads}>
            <span>Exporting project</span>
            <span className="uploads-right">
              <span className="uploads-spinner" aria-hidden="true" />
            </span>
          </button>
        ) : null}

        <div className="objects-v2-section-header">
          <span className="objects-v2-section-title">Geometry</span>
          <span className="objects-v2-section-count">1</span>
        </div>

        <label className="objects-v2-row objects-v2-select-all">
          <input type="checkbox" className="objects-v2-checkbox" />
          <span>Select all</span>
        </label>

        <label className="objects-v2-row objects-v2-date-row">
          <input type="checkbox" className="objects-v2-checkbox" />
          <span>{dateLabel}</span>
        </label>

        <div className="objects-v2-list">
          {points.map((point) => (
            <button
              key={point.id}
              type="button"
              className={`objects-v2-item ${selectedMode === 'point' && selectedPointId === point.id ? 'is-active' : ''}`}
              onClick={() => onSelectPoint(point.id)}
            >
              <div className="objects-v2-item-left">
                <input type="checkbox" className="objects-v2-checkbox" onClick={(e) => e.stopPropagation()} />
                <span className="objects-v2-dot" aria-hidden="true" />
                <span className="objects-v2-item-name">{point.name}</span>
              </div>
              <div className="objects-v2-item-sub">{`${dateLabel} • 14:25`}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
