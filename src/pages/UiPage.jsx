import React, { useEffect, useMemo, useRef, useState } from 'react';
import ExportModal from '../components/ExportModal';
import ExportStartedModal from '../components/ExportStartedModal';
import FullscreenViewer from '../components/FullscreenViewer';
import PhotoModal from '../components/PhotoModal';
import { clampMapScale, lineGeometry, points, VISIBLE_CARDS } from '../data/prototypeData';
import MapCanvas from '../sections/MapCanvas';
import ObjectsSidebar from '../sections/ObjectsSidebar';
import SelectionPanel from '../sections/SelectionPanel';

function openUploadsTab() {
  const u = new URL(window.location.href);
  u.hash = '#/uploads';
  window.open(u.toString(), '_blank', 'noopener,noreferrer');
}

export default function UiPage({ uploadJobs, setUploadJobs }) {
  const projectId = 'demo-project';
  const mapRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState('point');
  const [selectedPointId, setSelectedPointId] = useState(points[0].id);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isExportStartedOpen, setIsExportStartedOpen] = useState(false);
  const [exportNoticeVariant, setExportNoticeVariant] = useState('started'); // 'started' | 'already'
  const [openedFromModal, setOpenedFromModal] = useState(false);
  const [hoveredPhotoPointId, setHoveredPhotoPointId] = useState(null);
  const [mapScale, setMapScale] = useState(1);
  const [mapTranslate, setMapTranslate] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const selectedPoint = useMemo(
    () => points.find((point) => point.id === selectedPointId) || points[0],
    [selectedPointId]
  );

  const currentPhotos = useMemo(() => {
    if (selectedMode === 'line') {
      return points.flatMap((point) => (point.photos || []).map((photo) => ({ ...photo, pointId: point.id })));
    }
    return selectedPoint.photos || [];
  }, [selectedMode, selectedPoint]);

  const maxIndex = Math.max(0, currentPhotos.length - VISIBLE_CARDS);

  const linePhotoGroups = useMemo(() => {
    if (selectedMode !== 'line') return [];
    return points
      .map((point) => ({
        point,
        items: currentPhotos.map((photo, index) => ({ photo, index })).filter(({ photo }) => photo.pointId === point.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [currentPhotos, selectedMode]);

  useEffect(() => {
    setSliderIndex(0);
    setFullscreenIndex(0);
    setHoveredPhotoPointId(null);
    setIsModalOpen(false);
    setIsFullscreenOpen(false);
    setIsExportOpen(false);
    setIsExportStartedOpen(false);
  }, [selectedMode, selectedPointId]);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragState.active) return;
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      const moved = Math.abs(dx) > 3 || Math.abs(dy) > 3;
      setDragState((prev) => ({ ...prev, moved: prev.moved || moved }));
      setMapTranslate({ x: dragState.originX + dx, y: dragState.originY + dy });
    }

    function onMouseUp() {
      setDragState((prev) => ({ ...prev, active: false, moved: false }));
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragState]);

  useEffect(() => {
    function onKeyDown(e) {
      if (isFullscreenOpen) {
        if (e.key === 'Escape') onCloseFullscreen();
        if (e.key === 'ArrowLeft') setFullscreenIndex((prev) => Math.max(0, prev - 1));
        if (e.key === 'ArrowRight') setFullscreenIndex((prev) => Math.min(currentPhotos.length - 1, prev + 1));
      }
      if (isModalOpen && e.key === 'Escape') setIsModalOpen(false);
      if (isExportOpen && e.key === 'Escape') setIsExportOpen(false);
      if (isExportStartedOpen && e.key === 'Escape') setIsExportStartedOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreenOpen, isModalOpen, currentPhotos.length]);

  function startUploadJob({ name, projectId, kind }) {
    const hasRunningSameProjectExport = uploadJobs.some(
      (j) => j.kind === 'export' && j.projectId === projectId && j.status === 'running'
    );
    if (kind === 'export' && hasRunningSameProjectExport) return { ok: false };

    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const durationMs = 5 * 60 * 1000; // 5 minutes
    const startedAt = Date.now();
    const job = { id, name, projectId, kind, status: 'running', progress: 0, startedAt, durationMs };
    setUploadJobs((prev) => [...prev, job]);

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(100, (elapsed / durationMs) * 100);
      const isDone = progress >= 100;

      setUploadJobs((prev) => {
        const current = prev.find((j) => j.id === id);
        if (!current || current.status !== 'running') {
          window.clearInterval(timer);
          return prev;
        }
        return prev.map((j) => (j.id === id ? { ...j, progress, status: isDone ? 'done' : 'running' } : j));
      });
      if (isDone) window.clearInterval(timer);
    }, 1000);

    return { ok: true, id };
  }

  function onSelectPoint(pointId) {
    setSelectedMode('point');
    setSelectedPointId(pointId);
  }

  function onSelectLine() {
    setSelectedMode('line');
  }

  function zoomMapAt(clientX, clientY, nextScale) {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pointX = clientX - rect.left;
    const pointY = clientY - rect.top;
    const worldX = (pointX - mapTranslate.x) / mapScale;
    const worldY = (pointY - mapTranslate.y) / mapScale;
    const clampedScale = clampMapScale(nextScale);

    setMapScale(clampedScale);
    setMapTranslate({
      x: pointX - worldX * clampedScale,
      y: pointY - worldY * clampedScale,
    });
  }

  function handleMapWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.12 : 0.88;
    zoomMapAt(e.clientX, e.clientY, mapScale * delta);
  }

  function handleMapMouseDown(e) {
    if (e.button !== 0) return;
    if (e.target.closest('.map-point') || e.target.closest('.line-polyline')) return;
    setDragState({
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      originX: mapTranslate.x,
      originY: mapTranslate.y,
    });
  }

  function openFullscreen(index, fromModal = false) {
    if (!currentPhotos.length) return;
    setOpenedFromModal(fromModal);
    setIsModalOpen(false);
    setFullscreenIndex(index);
    setIsFullscreenOpen(true);
  }

  function onCloseFullscreen() {
    setHoveredPhotoPointId(null);
    setIsFullscreenOpen(false);
    if (openedFromModal) setIsModalOpen(true);
  }

  function renderPhotoCard(photo, index, modal = false) {
    const className = modal ? 'modal-item' : 'photo-card';
    const pointId = photo.pointId || selectedPointId;
    return (
      <div
        key={`${pointId}-${index}-${modal ? 'modal' : 'card'}`}
        className={className}
        data-point-id={pointId}
        onMouseEnter={() => setHoveredPhotoPointId(pointId)}
        onMouseLeave={() => setHoveredPhotoPointId(null)}
        onClick={() => openFullscreen(index, modal)}
      >
        <img src={photo.src} alt="" />
        <div className="photo-meta">
          <div className="photo-date">{photo.date}</div>
          <div className="photo-author">{photo.author}</div>
        </div>
      </div>
    );
  }

  const fullscreenPhoto = currentPhotos[fullscreenIndex];
  const fullscreenPoint = points.find((point) => point.id === (fullscreenPhoto?.pointId || selectedPointId)) || selectedPoint;
  // Keep polyline corners aligned with the visual point center.
  // .map-point dot has 18px size with 5px border => 28px total => center offset 14px from top-left.
  const POINT_CENTER_OFFSET = 14;
  const polyPoints = points.map((point) => `${point.x + POINT_CENTER_OFFSET},${point.y + POINT_CENTER_OFFSET}`).join(' ');

  return (
    <>
      <div className="frame">
        <header className="flow-header">
          <div className="flow-header-bar">
            <div className="flow-header-left">
              <div className="flow-menu-button-wrapper">
                <button type="button" className="flow-icon-button" aria-label="Menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M3 12h18M3 6h18M3 18h18"
                    />
                  </svg>
                </button>
              </div>

              <button type="button" className="flow-logo-button" aria-label="Home">
                <div className="flow-logo" aria-hidden="true" />
              </button>

              <nav aria-label="Breadcrumbs" className="flow-breadcrumbs">
                <ul className="flow-breadcrumbs-list">
                  <li className="flow-breadcrumbs-item">
                    <a href="#" className="flow-breadcrumbs-link" onClick={(e) => e.preventDefault()}>
                      All projects
                    </a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 10 6"
                      width="7"
                      height="5"
                      className="flow-breadcrumbs-sep"
                    >
                      <path d="m1 1 4 4 4-4"></path>
                    </svg>
                  </li>
                  <li className="flow-breadcrumbs-item">
                    <span className="flow-breadcrumbs-current">Demo project</span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flow-header-center">
              <div className="flow-service-button-group" role="toolbar" aria-label="Project actions">
                <button className="flow-service-button" type="button">
                  <svg className="flow-service-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M5.4 6.4L8 9l2.6-2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 11.5v1.2c0 .7.6 1.3 1.3 1.3h7.4c.7 0 1.3-.6 1.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="flow-service-caption">Import</span>
                </button>

                <button className="flow-service-button is-active" type="button" onClick={() => setIsExportOpen(true)}>
                  <svg className="flow-service-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M10.6 9.6 8 7 5.4 9.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 4.5V3.3C3 2.6 3.6 2 4.3 2h7.4c.7 0 1.3.6 1.3 1.3v1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="flow-service-caption">Export</span>
                </button>

                <button className="flow-service-button" type="button">
                  <svg className="flow-service-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M6.2 5.2 4.2 7.2l2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.8 10.8 11.8 8.8l-2-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.4 8h7.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="flow-service-caption">Inverse</span>
                </button>

                <button className="flow-service-button" type="button">
                  <svg className="flow-service-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13l4-10 3 7 3-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="flow-service-caption">Traverse</span>
                </button>

                <button className="flow-service-button is-disabled" type="button" disabled>
                  <svg className="flow-service-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M5 5.5a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M4 11a4.5 4.5 0 0 1 8 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M8 8v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="flow-service-caption">Intersection</span>
                </button>
              </div>
            </div>

            <div className="flow-header-right">
              <button className="flow-header-close" type="button" aria-label="Close">
                ×
              </button>
            </div>
          </div>

          <div className="flow-header-accent" aria-hidden="true" />
        </header>

        <div className="layout">
          <ObjectsSidebar
            points={points}
            selectedMode={selectedMode}
            selectedPointId={selectedPointId}
            onSelectPoint={onSelectPoint}
            uploadJobs={uploadJobs}
            onOpenUploads={openUploadsTab}
            uploadsCount={uploadJobs.filter((j) => j.status === 'running').length}
          />

          <MapCanvas
            mapRef={mapRef}
            dragState={dragState}
            mapTranslate={mapTranslate}
            mapScale={mapScale}
            points={points}
            polyPoints={polyPoints}
            selectedMode={selectedMode}
            selectedPointId={selectedPointId}
            hoveredPhotoPointId={hoveredPhotoPointId}
            onWheel={handleMapWheel}
            onMouseDown={handleMapMouseDown}
            onMouseLeave={() => dragState.active && setDragState((prev) => ({ ...prev, active: false, moved: false }))}
            onDoubleClick={(e) => {
              e.preventDefault();
              zoomMapAt(e.clientX, e.clientY, mapScale * 1.2);
            }}
            onSelectLine={onSelectLine}
            onSelectPoint={onSelectPoint}
          />

          <SelectionPanel
            selectedMode={selectedMode}
            selectedPoint={selectedPoint}
            points={points}
            currentPhotos={currentPhotos}
            sliderIndex={sliderIndex}
            setSliderIndex={setSliderIndex}
            maxIndex={maxIndex}
            onShowAll={() => setIsModalOpen(true)}
            renderPhotoCard={renderPhotoCard}
          />
        </div>
      </div>

      <PhotoModal
        isOpen={isModalOpen}
        selectedMode={selectedMode}
        currentPhotos={currentPhotos}
        linePhotoGroups={linePhotoGroups}
        renderPhotoCard={renderPhotoCard}
        onClose={() => setIsModalOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        projectName="Demo project"
        onClose={() => setIsExportOpen(false)}
        onExportStart={() => {
          const res = startUploadJob({ name: 'Export Demo project', projectId, kind: 'export' });
          setExportNoticeVariant(res.ok ? 'started' : 'already');
          setIsExportStartedOpen(true);
        }}
      />

      <ExportStartedModal
        isOpen={isExportStartedOpen}
        variant={exportNoticeVariant}
        onClose={() => setIsExportStartedOpen(false)}
        onOpenUploads={() => {
          setIsExportStartedOpen(false);
          openUploadsTab();
        }}
      />

      <FullscreenViewer
        isOpen={isFullscreenOpen}
        fullscreenIndex={fullscreenIndex}
        setFullscreenIndex={setFullscreenIndex}
        currentPhotos={currentPhotos}
        fullscreenPhoto={fullscreenPhoto}
        fullscreenPoint={fullscreenPoint}
        lineGeometry={lineGeometry}
        onClose={onCloseFullscreen}
      />
    </>
  );
}
