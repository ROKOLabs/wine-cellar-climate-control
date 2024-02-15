import { Suspense, lazy } from 'react';

const isDev = process.env.NODE_ENV === 'development';

const MaybeDevTools = isDev
  ? lazy(() => import('./components/DevTools'))
  : () => null;

export const DevTools = () => {
  if (!isDev) return null;
  return (
    <Suspense>
      <MaybeDevTools />
    </Suspense>
  );
};
