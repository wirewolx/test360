import React from 'react';

export default function ExportStartedModal({ isOpen, onClose }) {
  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.className === 'overlay active' && onClose?.()}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box export-started-modal" role="dialog" aria-modal="true" aria-label="Export started">
        <button className="export-started-close" type="button" onClick={onClose} aria-label="Close" />

        <div className="export-started-body">
          <div className="export-started-loader" aria-hidden="true" />
          <p className="export-started-message">Export started. This may take a while, you can close this window and continue working.</p>
        </div>
      </div>
    </div>
  );
}

