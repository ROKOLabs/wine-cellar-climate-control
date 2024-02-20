import { useContext } from 'react';

import { DevToolsVisibilityContext } from 'components/DevTools/components/provider/DevToolsContext';

export const useDevToolsVisibility = () =>
  useContext(DevToolsVisibilityContext);
