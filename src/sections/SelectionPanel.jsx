import React from 'react';
import PhotosSection from '../components/PhotosSection';

function PointPanel({ selectedPoint, currentPhotos, sliderIndex, setSliderIndex, maxIndex, onShowAll, renderPhotoCard }) {
  return (
    <div>
      <section className="point-info-mobile">
        <div className="point-main-row">
          <div className="point-main-left">
            <div className="point-main-dot"></div>
            <div className="point-main-title">{selectedPoint.name}</div>
          </div>
          <div className="point-main-type">{selectedPoint.type}</div>
        </div>

        <div className="detail-block">
          <div className="detail-heading">Code</div>
          <div className="detail-inline-row">
            <div className="detail-pill">{selectedPoint.code}</div>
            <div className="detail-inline-text">|</div>
            <div className="detail-pill">{selectedPoint.category}</div>
            <div className="detail-inline-text">{selectedPoint.library}</div>
          </div>
        </div>

        <div className="detail-block">
          <div className="detail-heading">Solution</div>
          <div className="solution-pill">{selectedPoint.status}</div>
        </div>
      </section>

      <PhotosSection
        title="Point photos"
        photos={currentPhotos}
        sliderIndex={sliderIndex}
        setSliderIndex={setSliderIndex}
        maxIndex={maxIndex}
        onShowAll={onShowAll}
        renderCard={(photo, index) => renderPhotoCard(photo, index)}
      />

      <section className="detail-block">
        <div className="detail-row with-icon">
          <div>
            <div className="detail-heading" style={{ marginBottom: 2 }}>Coordinate system</div>
            <div className="detail-subtext">{selectedPoint.coordSystemName}</div>
          </div>
          <div className="info-circle">i</div>
        </div>
      </section>

      <section className="detail-block">
        <div className="detail-heading">Coordinate system</div>
        <div className="segmented-control">
          <div className="segment">Local</div>
          <div className="segment active">{selectedPoint.coordMode}</div>
        </div>
        <div className="kv-list">
          <div className="kv-row"><div>Longitude</div><div>{selectedPoint.longitude}</div></div>
          <div className="kv-row"><div>Latitude</div><div>{selectedPoint.latitude}</div></div>
          <div className="kv-row"><div>Ellipsoidal height</div><div>{selectedPoint.ellipsoidalHeight}</div></div>
        </div>
      </section>

      <section className="detail-block">
        <div className="detail-heading">RMS</div>
        <div className="detail-stacked-values">
          {selectedPoint.rms.map((value) => <div key={value}>{value}</div>)}
        </div>
      </section>

      <section className="detail-block">
        <div className="detail-heading">Antenna height</div>
        <div className="detail-subtext strong">{selectedPoint.antennaHeight}</div>
      </section>

      <section className="detail-block detail-block-last">
        <div className="detail-heading">Collected</div>
        <div className="detail-subtext strong">{selectedPoint.collectedBy}</div>
        <div className="detail-subtext">{selectedPoint.collectedAt}</div>
      </section>
    </div>
  );
}

function LinePanel({ points, currentPhotos, sliderIndex, setSliderIndex, maxIndex, onShowAll, renderPhotoCard }) {
  return (
    <div>
      <section className="line-summary">
        <div className="detail-block">
          <div className="detail-heading">Points</div>
          <div className="line-summary-value">{points.length}</div>
        </div>

        <div className="detail-block">
          <div className="detail-heading">Code</div>
          <div className="detail-inline-row">
            <div className="detail-pill">BLDG</div>
            <div className="detail-inline-text">|</div>
            <div className="detail-pill">Building</div>
            <div className="detail-inline-text">in Emlid library</div>
          </div>
        </div>

        <div className="detail-block">
          <div className="detail-heading">Created</div>
          <div className="detail-subtext strong">Oleg Mariyanovskiy</div>
          <div className="detail-subtext">03 Sep 2025 • 18:52</div>
        </div>
      </section>

      <PhotosSection
        title="Line photos"
        photos={currentPhotos}
        sliderIndex={sliderIndex}
        setSliderIndex={setSliderIndex}
        maxIndex={maxIndex}
        onShowAll={onShowAll}
        renderCard={(photo, index) => renderPhotoCard(photo, index)}
      />

      <div className="line-section-title">Line</div>
      <div className="line-metric-list">
        <div className="line-metric-row"><div>Slope distance</div><div>6.974 m</div></div>
        <div className="line-metric-row"><div>2D distance</div><div>6.966 m</div></div>
        <div className="line-subsegment">
          <div className="line-subsegment-arrow">‹</div>
          <div className="line-subsegment-title">Point to point: {points[0].name} - {points[1].name}</div>
          <div className="line-subsegment-arrow">›</div>
        </div>
        <div className="line-metric-row"><div>Direction</div><div>46° 56′ 51.31″</div></div>
        <div className="line-metric-row"><div>Slope distance</div><div>2.014 m</div></div>
        <div className="line-metric-row"><div>2D distance</div><div>2.013 m</div></div>
        <div className="line-metric-row"><div>Height difference</div><div>0.082 m</div></div>
        <div className="line-metric-row"><div>Grade</div><div>4.084%</div></div>
        <div className="line-metric-row"><div>Delta E</div><div>1.471 m</div></div>
        <div className="line-metric-row"><div>Delta N</div><div>1.374 m</div></div>
      </div>
    </div>
  );
}

export default function SelectionPanel(props) {
  const { selectedMode } = props;

  return (
    <aside className="right">
      <div className="selected-header">
        <div className="selected-header-icon">←</div>
        <div className="selected-header-title">{selectedMode === 'line' ? 'Selected line' : 'Selected point'}</div>
        <div className="selected-header-icon">•••</div>
      </div>

      {selectedMode === 'point' ? <PointPanel {...props} /> : <LinePanel {...props} />}
    </aside>
  );
}
