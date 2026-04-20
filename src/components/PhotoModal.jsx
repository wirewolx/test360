import React from 'react';

export default function PhotoModal({ isOpen, selectedMode, currentPhotos, linePhotoGroups, renderPhotoCard, onClose }) {
  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target.className === 'overlay active' && onClose()}>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="photos-header" style={{ marginBottom: 0 }}>
          <div className="photos-title">
            <span>{selectedMode === 'line' ? 'Line photos' : 'Point photos'}</span>{' '}
            <span className="photos-count">{currentPhotos.length}</span>
          </div>
        </div>

        <div className={`modal-grid ${selectedMode === 'point' ? 'point-grid' : ''}`}>
          {selectedMode === 'point'
            ? currentPhotos.map((photo, index) => renderPhotoCard(photo, index, true))
            : linePhotoGroups.map((group) => (
              <div className="modal-group" key={group.point.id}>
                <div className="modal-group-title">{group.point.name}</div>
                <div className="modal-group-grid">
                  {group.items.map(({ photo, index }) => renderPhotoCard(photo, index, true))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
