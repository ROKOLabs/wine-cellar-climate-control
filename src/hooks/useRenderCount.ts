import { useEffect, useRef } from 'react';

export const useRenderCount = (component: string) => {
  const renderCount = useRef(0);

  useEffect(() => {
    console.log(`Render count: ${++renderCount.current} for ${component}`);
  });

  useEffect(() => {
    return () => {
      console.log(`Unmounted ${component}`);
    };
  }, [component]);
};
