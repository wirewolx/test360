import React from 'react';

export default function FullscreenViewer({ isOpen, fullscreenIndex, setFullscreenIndex, currentPhotos, fullscreenPhoto, fullscreenPoint, lineGeometry, onClose }) {
  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} id="fullscreenOverlay">
      <div className="fullscreen-backdrop" onClick={onClose}></div>

      <div className="fs-nav-zone fs-nav-left" onClick={() => setFullscreenIndex((prev) => Math.max(0, prev - 1))}></div>
      <div className="fs-close-zone fs-close-center-left" onClick={onClose}></div>
      <div className="fs-close-zone fs-close-center-right" onClick={onClose}></div>
      <div className="fs-nav-zone fs-nav-right" onClick={() => setFullscreenIndex((prev) => Math.min(currentPhotos.length - 1, prev + 1))}></div>

      <button className="fs-close" onClick={onClose}>×</button>
      <button className={`fs-arrow left ${fullscreenIndex === 0 || currentPhotos.length <= 1 ? 'hidden' : ''}`} onClick={() => setFullscreenIndex((prev) => Math.max(0, prev - 1))}>‹</button>

      <div className="fs-meta-top">
        <div className="fs-point-name">{fullscreenPoint?.name || lineGeometry.name}</div>
        <div className="fs-meta-sub">{fullscreenPhoto ? `${fullscreenPhoto.author} • ${fullscreenPhoto.date}` : ''}</div>
      </div>

      <div className="fullscreen-content">
        <div className="fullscreen-image-wrap">
          {fullscreenPhoto ? <img src={fullscreenPhoto.src} alt="" /> : null}
        </div>
      </div>

      <button className={`fs-arrow right ${fullscreenIndex === currentPhotos.length - 1 || currentPhotos.length <= 1 ? 'hidden' : ''}`} onClick={() => setFullscreenIndex((prev) => Math.min(currentPhotos.length - 1, prev + 1))}>›</button>
    </div>
  );
}
