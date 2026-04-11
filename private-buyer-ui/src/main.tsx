import './globals';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Loading } from '@/components/loading';
import './index.css';

const LazyApp = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
