import { useContext } from 'react';

import { SidebarDispatchContext } from 'features/layout/SidebarContext';

export const useSidebarDispatch = () => {
  const dispatch = useContext(SidebarDispatchContext);
  if (dispatch === null)
    throw new Error('useSidebarDispatch must be used within SidebarProvider');
  return dispatch;
};
