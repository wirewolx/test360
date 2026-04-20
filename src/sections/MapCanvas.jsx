import React from 'react';

export default function MapCanvas({
  mapRef,
  dragState,
  mapTranslate,
  mapScale,
  points,
  polyPoints,
  selectedMode,
  selectedPointId,
  hoveredPhotoPointId,
  onWheel,
  onMouseDown,
  onMouseLeave,
  onDoubleClick,
  onSelectLine,
  onSelectPoint,
}) {
  return (
    <main
      className={`map ${dragState.active ? 'is-dragging' : ''}`}
      ref={mapRef}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="map-inner"
        style={{ transform: `translate(${mapTranslate.x}px, ${mapTranslate.y}px) scale(${mapScale})` }}
      >
        <svg className="line-layer" viewBox="0 0 904 773">
          <polyline className="line-polyline-bg" points={polyPoints} />
          <polyline
            className={`line-polyline ${selectedMode === 'line' ? 'is-active' : ''}`}
            points={polyPoints}
            onClick={(e) => {
              e.stopPropagation();
              if (!dragState.moved) onSelectLine();
            }}
          />
        </svg>

        {points.map((point) => (
          <div
            key={point.id}
            className={`map-point ${selectedMode === 'point' && point.id === selectedPointId ? 'is-active' : ''} ${hoveredPhotoPointId === point.id ? 'is-photo-hover' : ''}`}
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
            onClick={(e) => {
              e.stopPropagation();
              if (!dragState.moved) onSelectPoint(point.id);
            }}
          >
            <div className="point-row">
              <div className="dot"></div>
              <div className="label-top">{point.code}</div>
            </div>
            <div className="label-bottom">{point.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
