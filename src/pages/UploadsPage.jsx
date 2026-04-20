import React, { useEffect, useMemo, useRef, useState } from 'react';

function clampPercent(n) {
  return Math.max(0, Math.min(100, n));
}

export default function UploadsPage({ jobs = [], onCancelJob }) {
  const [tick, setTick] = useState(0);
  const derivedStartedAtRef = useRef({});
  const derivedDurationMsRef = useRef({});

  useEffect(() => {
    const hasRunning = jobs.some((j) => j.status === 'running');
    if (!hasRunning) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 1000);
    return () => window.clearInterval(t);
  }, [jobs]);

  const renderedJobs = useMemo(() => {
    const now = Date.now();
    return jobs.map((j) => {
      if (j.status !== 'running') return j;
      const startedAt =
        j.startedAt ??
        derivedStartedAtRef.current[j.id] ??
        (derivedStartedAtRef.current[j.id] = now);

      const durationMs =
        j.durationMs ??
        derivedDurationMsRef.current[j.id] ??
        (derivedDurationMsRef.current[j.id] = 5 * 60 * 1000);

      const progress = Math.min(100, ((now - startedAt) / durationMs) * 100);
      return { ...j, progress };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, tick]);

  return (
    <section className="uploads-page" aria-label="Uploads page">
      <div className="uploads-page-container">
        <div className="uploads-page-title-row">
          <div className="uploads-page-title">All projects exports</div>
        </div>

        <div className="uploads-page-list">
          {renderedJobs.length ? (
            renderedJobs
              .slice()
              .reverse()
              .map((job) => {
                const pct = clampPercent(job.progress || 0);
                const pctText = Math.max(0, Math.min(100, Math.round(pct)));
                const isRunning = job.status === 'running';
                const isCancelled = job.status === 'cancelled';
                const isDone = job.status === 'done';
                return (
                  <div className="uploads-row" key={job.id}>
                    <div className="uploads-row-main">
                      <div className="uploads-row-name">{job.name}</div>
                      <div className="uploads-row-sub">
                        <span className={`uploads-row-status ${job.status}`}>
                          {isRunning ? `In progress · ${pctText}%` : isCancelled ? 'Cancelled' : ''}
                        </span>
                      </div>
                      {isRunning ? (
                        <div className="uploads-row-bar" aria-hidden="true">
                          <div className="uploads-row-fill" style={{ width: `${pct}%` }} />
                        </div>
                      ) : null}

                      {isDone ? (
                        <button
                          type="button"
                          className="uploads-row-show-folder"
                          onClick={() => window.alert('Prototype: покажу файл в папке (нужен бэк/нативный клиент).')}
                        >
                          Показать в папке
                        </button>
                      ) : null}
                    </div>

                    {isRunning ? (
                      <button type="button" className="uploads-row-cancel" onClick={() => onCancelJob?.(job.id)}>
                        Cancel
                      </button>
                    ) : null}
                  </div>
                );
              })
          ) : (
            <div className="uploads-empty">No uploads yet.</div>
          )}
        </div>

      </div>
    </section>
  );
}

