import { useContext } from 'react';

import { SidebarContext } from 'features/layout/SidebarContext';

export const useSidebarState = () => {
  const context = useContext(SidebarContext);
  if (context === null)
    throw new Error('useSidebarState must be used within SidebarProvider');
  return context;
};
