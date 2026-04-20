import React, { useEffect, useMemo, useState } from 'react';
import UiPage from './pages/UiPage';
import UploadsTab from './pages/UploadsTab';

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '');
  const [uploadJobs, setUploadJobs] = useState(() => {
    try {
      const raw = window.localStorage.getItem('uploadJobs');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function onHashChange() {
      setHash(window.location.hash || '');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('uploadJobs', JSON.stringify(uploadJobs));
    } catch {
      // ignore
    }
  }, [uploadJobs]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key !== 'uploadJobs') return;
      try {
        setUploadJobs(e.newValue ? JSON.parse(e.newValue) : []);
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Keep job progress and completion status moving even if the project tab
  // is closed or the user is on the exports page in another tab.
  useEffect(() => {
    const hasRunning = uploadJobs.some((j) => j.status === 'running');
    if (!hasRunning) return;

    const t = window.setInterval(() => {
      const now = Date.now();
      setUploadJobs((prev) => {
        let changed = false;
        const next = prev.map((j) => {
          if (j.status !== 'running') return j;
          const startedAt = typeof j.startedAt === 'number' ? j.startedAt : now;
          const durationMs = typeof j.durationMs === 'number' ? j.durationMs : 5 * 60 * 1000;
          const progress = Math.min(100, ((now - startedAt) / durationMs) * 100);
          const isDone = progress >= 100;
          const nextJ = isDone
            ? { ...j, startedAt, durationMs, progress: 100, status: 'done', completedAt: j.completedAt ?? now }
            : { ...j, startedAt, durationMs, progress };
          if (nextJ !== j) changed = true;
          return nextJ;
        });
        return changed ? next : prev;
      });
    }, 1000);

    return () => window.clearInterval(t);
  }, [uploadJobs]);

  const route = useMemo(() => (hash.startsWith('#/uploads') ? 'uploads' : 'project'), [hash]);

  if (route === 'uploads') {
    return <UploadsTab jobs={uploadJobs} setUploadJobs={setUploadJobs} />;
  }

  return <UiPage uploadJobs={uploadJobs} setUploadJobs={setUploadJobs} />;
}
