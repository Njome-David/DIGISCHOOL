import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './shared/lib/i18n';
import { ErrorBoundary } from './app/ErrorBoundary';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-500">Chargement…</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
