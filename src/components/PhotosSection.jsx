import React from 'react';
import { CARD_WIDTH } from '../data/prototypeData';

export default function PhotosSection({ title, photos, sliderIndex, setSliderIndex, maxIndex, onShowAll, renderCard }) {
  return (
    <section className="photos-section photos-section-mobile">
      <div className="photos-header">
        <div className="photos-title">{title} <span className="photos-count">{photos.length}</span></div>
        <div className={`show-all ${photos.length ? '' : 'hidden'}`} onClick={onShowAll}>Show All</div>
      </div>

      <div className="carousel">
        <button className={`arrow left ${photos.length <= 1 ? 'hidden' : ''} ${sliderIndex === 0 ? 'disabled' : ''}`} onClick={() => setSliderIndex((prev) => Math.max(0, prev - 1))}>‹</button>
        <div className="carousel-viewport">
          {photos.length ? (
            <div className="track" style={{ transform: `translateX(-${sliderIndex * CARD_WIDTH}px)` }}>
              {photos.map((photo, index) => renderCard(photo, index))}
            </div>
          ) : (
            <div className="empty-photos">No photos for this item yet.</div>
          )}
        </div>
        <button className={`arrow right ${photos.length <= 1 ? 'hidden' : ''} ${sliderIndex >= maxIndex ? 'disabled' : ''}`} onClick={() => setSliderIndex((prev) => Math.min(maxIndex, prev + 1))}>›</button>
      </div>
    </section>
  );
}
