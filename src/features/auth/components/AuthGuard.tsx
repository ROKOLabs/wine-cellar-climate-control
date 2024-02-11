import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetAuthStateQuery } from 'features/auth/authApi';
import { routes } from 'router/routes';

export const AuthGuard = () => {
  const navigate = useNavigate();
  const { data } = useGetAuthStateQuery();

  useEffect(() => {
    if (data) navigate(routes.dashboard);
    else if (data === null) navigate(routes.login);
  }, [data, navigate]);

  return <Outlet />;
};
