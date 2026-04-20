import React, { useMemo, useState } from 'react';

const EXPORT_TYPES = [
  { id: 'csv', label: 'CSV' },
  { id: 'csv-custom', label: 'Custom CSV' },
  { id: 'dxf', label: 'DXF' },
  { id: 'kml', label: 'KML' },
  { id: 'shp', label: 'Shapefile' },
  { id: 'stakeout', label: 'Stakeout report (CSV)' },
];

function ExportTypeIcon({ typeId }) {
  const common = { width: 16, height: 16, viewBox: '0 0 16 16', xmlns: 'http://www.w3.org/2000/svg' };
  switch (typeId) {
    case 'csv':
    case 'stakeout':
      return (
        <svg {...common} fill="none">
          <path
            fill="#4CAF50"
            fillRule="evenodd"
            d="M4.692 1.247a2.34 2.34 0 0 0-2.34 2.34v8.82a2.34 2.34 0 0 0 2.34 2.34h6.615a2.34 2.34 0 0 0 2.34-2.34v-4.41h1.2v4.41a3.54 3.54 0 0 1-3.54 3.54H4.692a3.54 3.54 0 0 1-3.54-3.54v-8.82a3.54 3.54 0 0 1 3.54-3.54h5.589a.6.6 0 0 1 .455.209l3.967 4.62a.6.6 0 0 1 .144.391v2.73h-1.2v-2.13h-2.632A1.335 1.335 0 0 1 9.68 4.532V1.247zm6.188 1.02 2.061 2.4h-1.926a.135.135 0 0 1-.135-.135z"
            clipRule="evenodd"
          />
          <path
            fill="#4CAF50"
            fillRule="evenodd"
            d="M4.509 7.031h6.982a.6.6 0 0 1 .6.6v4.778a.597.597 0 0 1-.614.6H4.51a.6.6 0 0 1-.6-.6V7.63a.6.6 0 0 1 .6-.6m.6 4.778h2.29v-1.191H5.11zm3.49 0h2.292v-1.191H8.6zm2.292-3.578v1.187H8.6V8.231zm-3.491 0v1.187H5.109V8.231z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'csv-custom':
      return (
        <svg {...common} fill="none">
          <path
            fill="#4CAF50"
            fillRule="evenodd"
            d="M2.269 3.562a2.403 2.403 0 0 1 2.403-2.404H9.74v3.355c0 .714.579 1.294 1.294 1.294h2.698v.455c.377.008.753.082 1.109.222V5.252a.56.56 0 0 0-.134-.361L10.716.242a.55.55 0 0 0-.421-.193H4.672A3.513 3.513 0 0 0 1.16 3.562v8.874a3.513 3.513 0 0 0 3.513 3.513h1.886a2.34 2.34 0 0 1-.305-1.11h-1.58a2.403 2.403 0 0 1-2.404-2.403zm10.81 1.136L10.849 2.1v2.412c0 .102.083.185.185.185z"
            clipRule="evenodd"
          />
          <path
            fill="#4CAF50"
            fillRule="evenodd"
            d="M6.497 12.993h-2.01a.555.555 0 0 1-.554-.555V7.63c0-.307.248-.555.554-.555h7.032a3 3 0 0 0-.139.131l-.978.978H8.555V9.48h.553l-1.663 1.663v-.554H5.042v1.294h1.794c-.147.26-.247.545-.296.843zm.948-3.513V8.185H5.042V9.48zM12.229 8.055a2.03 2.03 0 0 1 2.868 0l.18.18c.38.38.577.872.593 1.37a2.02 2.02 0 0 1-.59 1.568l-4.13 4.13a1.33 1.33 0 0 1-.73.373l-1.614.26a1.167 1.167 0 0 1-1.34-1.328q.002-.096.017-.192l.242-1.5c.045-.276.175-.532.374-.73zm2.642 1.599c.004.268-.096.538-.3.742l-.328.328-1.598-1.598.294-.295a1.03 1.03 0 0 1 1.454 0l.18.181c.18.179.279.408.298.642m-2.933.179-3.129 3.13a.33.33 0 0 0-.093.182L8.47 14.66a.25.25 0 0 0 .286.202l1.5-.242a.33.33 0 0 0 .182-.093l3.097-3.096z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'dxf':
      return (
        <svg {...common} fill="none">
          <path
            fill="#E24141"
            fillRule="evenodd"
            d="M4.692 1.249a2.34 2.34 0 0 0-2.34 2.34v8.82a2.34 2.34 0 0 0 2.34 2.34h6.615a2.34 2.34 0 0 0 2.34-2.34v-4.41h1.2v4.41a3.54 3.54 0 0 1-3.54 3.54H4.692a3.54 3.54 0 0 1-3.54-3.54v-8.82a3.54 3.54 0 0 1 3.54-3.54h5.589a.6.6 0 0 1 .455.209l3.967 4.62a.6.6 0 0 1 .144.391v2.73h-1.2v-2.13h-2.632A1.335 1.335 0 0 1 9.68 4.534V1.249zm6.188 1.02 2.061 2.4h-1.926a.135.135 0 0 1-.135-.135z"
            clipRule="evenodd"
          />
          <path
            fill="#E24141"
            fillRule="evenodd"
            d="M6.897 5.93a.6.6 0 0 1 .6.6v2.022a.6.6 0 0 1-1.2 0V6.53a.6.6 0 0 1 .6-.6m0 4.96a.6.6 0 0 1 .6.6v1.655a.6.6 0 1 1-1.2 0V11.49a.6.6 0 0 1 .6-.6M12.642 10.206a.6.6 0 0 1-.6.6h-3.49a.6.6 0 0 1 0-1.2h3.49a.6.6 0 0 1 .6.6m-6.798 0a.6.6 0 0 1-.6.6H3.957a.6.6 0 0 1 0-1.2h1.287a.6.6 0 0 1 .6.6"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'kml':
      return (
        <svg {...common} fill="none">
          <path
            fill="#5C6AE5"
            fillRule="evenodd"
            d="M4.693 1.249a2.34 2.34 0 0 0-2.34 2.34v8.82a2.34 2.34 0 0 0 2.34 2.34h6.615a2.34 2.34 0 0 0 2.34-2.34v-4.41h1.2v4.41a3.54 3.54 0 0 1-3.54 3.54H4.693a3.54 3.54 0 0 1-3.54-3.54v-8.82a3.54 3.54 0 0 1 3.54-3.54h5.588a.6.6 0 0 1 .455.209l3.967 4.62a.6.6 0 0 1 .145.391v2.73h-1.2v-2.13h-2.633a1.335 1.335 0 0 1-1.334-1.335V1.249zm6.188 1.02 2.06 2.4h-1.926a.135.135 0 0 1-.134-.135z"
            clipRule="evenodd"
          />
          <path
            fill="#5C6AE5"
            fillRule="evenodd"
            d="M14.694 9.135l-2.87 3.188a2.07 2.07 0 0 1-1.539.685h-3.25a.87.87 0 0 0-.535.184l-2.909 2.262-.737-.947 2.91-2.262a2.07 2.07 0 0 1 1.27-.437h3.251a.87.87 0 0 0 .647-.288l2.87-3.188z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'shp':
      return (
        <svg {...common} fill="none">
          <path
            fill="#B66200"
            fillRule="evenodd"
            d="M4.692 1.249a2.34 2.34 0 0 0-2.34 2.34v8.82a2.34 2.34 0 0 0 2.34 2.34h6.615a2.34 2.34 0 0 0 2.34-2.34v-4.41h1.2v4.41a3.54 3.54 0 0 1-3.54 3.54H4.692a3.54 3.54 0 0 1-3.54-3.54v-8.82a3.54 3.54 0 0 1 3.54-3.54h5.589a.6.6 0 0 1 .455.209l3.967 4.62a.6.6 0 0 1 .144.391v2.73h-1.2v-2.13h-2.632A1.335 1.335 0 0 1 9.68 4.534V1.249zm6.188 1.02 2.061 2.4h-1.926a.135.135 0 0 1-.135-.135z"
            clipRule="evenodd"
          />
          <path
            fill="#B66200"
            fillRule="evenodd"
            d="M5.293 3.589c0-.075.06-.135.135-.135h1.47c.074 0 .135.06.135.135v1.47a.87.87 0 0 1-1.74 0zm.135-1.335c-.738 0-1.335.598-1.335 1.335v1.47a2.07 2.07 0 1 0 4.14 0v-1.47c0-.737-.598-1.335-1.335-1.335z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function ExportModal({ isOpen, projectName = 'New project', onClose, onExportStart }) {
  const [typeId, setTypeId] = useState('csv');
  const [fileConfig, setFileConfig] = useState('penzd');
  const [includePhotos, setIncludePhotos] = useState(false);

  const title = useMemo(() => `Export ${projectName}`, [projectName]);
  const rightTitle = useMemo(() => EXPORT_TYPES.find((t) => t.id === typeId)?.label || 'CSV', [typeId]);
  const showPhotosSection = fileConfig !== 'photosOnly';

  function onExport() {
    onExportStart?.();
    onClose?.();
  }

  return (
    <div className={`overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box export-modal" role="dialog" aria-modal="true" aria-label={title}>
        <button className="export-close" type="button" onClick={onClose} aria-label="Close" />

        <div className="export-modal-body">
          <div className="export-left-col">
            <div className="export-left-header">{title}</div>

            <div className="export-type-group" role="radiogroup" aria-label="Export type">
              {EXPORT_TYPES.map((t) => (
                <div className="export-radio-row" key={t.id}>
                  <input
                    id={`export_btn_${t.id}`}
                    className="export-type-input"
                    type="radio"
                    name="exportType"
                    value={t.id}
                    checked={typeId === t.id}
                    onChange={() => setTypeId(t.id)}
                  />
                  <label
                    htmlFor={`export_btn_${t.id}`}
                    className={`export-type-label ${typeId === t.id ? 'is-active' : ''}`}
                  >
                    <span className="export-type-icon" aria-hidden="true">
                      <ExportTypeIcon typeId={t.id} />
                    </span>
                    <span className="export-type-text">{t.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="export-right-col">
            <section className="export-settings">
              <h4 className="export-settings-title">{rightTitle}</h4>

              <div className="export-settings-block">
                <h4 className="export-settings-block-title">File configuration</h4>
                <div className="export-options">
                  <label className="export-option">
                    <input
                      className="export-option-input"
                      type="radio"
                      name="fileConfig"
                      value="all"
                      checked={fileConfig === 'all'}
                      onChange={() => setFileConfig('all')}
                    />
                    All columns
                  </label>
                  <label className="export-option">
                    <input
                      className="export-option-input"
                      type="radio"
                      name="fileConfig"
                      value="penzd"
                      checked={fileConfig === 'penzd'}
                      onChange={() => setFileConfig('penzd')}
                    />
                    PENZD columns
                  </label>
                  <label className="export-option">
                    <input
                      className="export-option-input"
                      type="radio"
                      name="fileConfig"
                      value="pnezd"
                      checked={fileConfig === 'pnezd'}
                      onChange={() => setFileConfig('pnezd')}
                    />
                    PNEZD columns
                  </label>
                  <label className="export-option">
                    <input
                      className="export-option-input"
                      type="radio"
                      name="fileConfig"
                      value="photosOnly"
                      checked={fileConfig === 'photosOnly'}
                      onChange={() => setFileConfig('photosOnly')}
                    />
                    Export only photos
                  </label>
                </div>
              </div>

              {showPhotosSection ? (
                <div className="export-settings-block">
                  <h4 className="export-settings-block-title">Photos</h4>
                  <label className="export-option">
                    <input
                      className="export-option-input"
                      type="checkbox"
                      checked={includePhotos}
                      onChange={(e) => setIncludePhotos(e.target.checked)}
                    />
                    Include photos in export
                  </label>
                </div>
              ) : null}

              <div className="export-footer">
                <button className="export-submit" data-testid="button" type="button" onClick={onExport}>
                  Export
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

