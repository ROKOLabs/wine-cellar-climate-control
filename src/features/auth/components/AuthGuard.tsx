import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetAuthStateQuery } from 'features/auth/authApi';
import { setAuthenticated } from 'features/auth/authSlice';
import { routes } from 'router/routes';

export const AuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAuthStateQuery();

  useEffect(() => {
    if (data) {
      dispatch(setAuthenticated(true));
    } else if (data === null) {
      dispatch(setAuthenticated(false));
      navigate(routes.login);
    }
  }, [data, dispatch, navigate]);

  return <Outlet />;
};
