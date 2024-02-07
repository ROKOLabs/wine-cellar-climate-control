import { DispatchWithoutAction } from 'react';

import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { useSidebarState } from 'features/layout/hooks/useSidebarState';

export const useSidebar = (): [boolean, DispatchWithoutAction] => {
  const state = useSidebarState();
  const dispatch = useSidebarDispatch();
  return [state, dispatch];
};
