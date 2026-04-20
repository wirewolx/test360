import React from 'react';

export default function ExportStartedModal({ isOpen, onClose, onOpenUploads, variant = 'started' }) {
  const isAlready = variant === 'already';

  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.className === 'overlay active' && onClose?.()}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box export-started-modal" role="dialog" aria-modal="true" aria-label="Export info">
        <button className="export-started-close" type="button" onClick={onClose} aria-label="Close" />

        <div className="export-started-body">
          <div className="export-started-icon" aria-hidden="true">
            {isAlready ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="18" stroke="#E24141" strokeWidth="2.5" />
                <path d="M22 13.5v13" stroke="#E24141" strokeWidth="3" strokeLinecap="round" />
                <circle cx="22" cy="31.8" r="1.8" fill="#E24141" />
              </svg>
            ) : (
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
            )}
          </div>

          <div className="export-started-text">
            <div className="export-started-title">{isAlready ? 'Экспорт уже выполняется' : 'Загрузка началась'}</div>
            <div className="export-started-subtext">
              {isAlready ? 'Повторный экспорт для этого проекта пока недоступен. ' : 'Вы можете следить за прогрессом '}
              <button type="button" className="export-started-link" onClick={onOpenUploads}>
                Открыть All projects exports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

