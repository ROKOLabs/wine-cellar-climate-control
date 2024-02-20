import { useContext } from 'react';

import { DevToolsToggleContext } from 'components/DevTools/components/provider/DevToolsContext';

export const useDevToolsToggle = () => useContext(DevToolsToggleContext);
