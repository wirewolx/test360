import React from 'react';

function percent(n) {
  const v = Math.max(0, Math.min(100, Math.round(n)));
  return v;
}

export default function UploadsModal({ isOpen, jobs = [], onClose }) {
  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.className === 'overlay active' && onClose?.()}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box uploads-modal" role="dialog" aria-modal="true" aria-label="Project exports">
        <button className="uploads-close" type="button" onClick={onClose} aria-label="Close" />

        <div className="uploads-body">
          <div className="uploads-title">Project exports</div>

          <div className="uploads-list">
            {jobs.length ? (
              jobs
                .slice()
                .reverse()
                .map((job) => (
                  <div className="uploads-item" key={job.id}>
                    <div className="uploads-item-top">
                      <div className="uploads-item-name">{job.name}</div>
                      <div className={`uploads-item-status ${job.status}`}>{job.status === 'done' ? 'Done' : 'In progress'}</div>
                    </div>
                    <div className="uploads-item-progress">
                      <div className="uploads-progress-bar">
                        <div className="uploads-progress-fill" style={{ width: `${percent(job.progress)}%` }} />
                      </div>
                      <div className="uploads-progress-value">{`${percent(job.progress)}%`}</div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="uploads-empty">No uploads yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

