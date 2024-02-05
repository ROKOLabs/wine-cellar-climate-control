import { Outlet } from 'react-router-dom';

import { useAuthStateChanged } from 'features/auth/hooks/useAuthStateChanged';

export const AuthStateChangeGuard = () => {
  useAuthStateChanged();
  return <Outlet />;
};
