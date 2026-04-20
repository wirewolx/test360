import React from 'react';

export default function ExportSuccessModal({ isOpen, exportedCount = 1, totalCount = 1, onClose }) {
  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.className === 'overlay active' && onClose?.()}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box export-success-modal" role="dialog" aria-modal="true" aria-label="Export complete">
        <button className="export-success-close" type="button" onClick={onClose} aria-label="Close" />

        <div className="export-success-body">
          <div className="export-success-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="18" stroke="#38C55A" strokeWidth="2.5" />
              <path
                d="M16.8 22.5l3.6 3.8L28 18.8"
                stroke="#38C55A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="export-success-text">{`${exportedCount} of ${totalCount} objects are exported`}</div>
        </div>
      </div>
    </div>
  );
}

