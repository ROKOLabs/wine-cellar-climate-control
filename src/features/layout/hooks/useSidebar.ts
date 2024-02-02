import { useContext } from 'react';

import { SidebarContext } from 'features/layout/SidebarContext';

export const useSidebar = () => useContext(SidebarContext);
