import { ifElse, juxt, pipe } from 'ramda';
import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import { resetDbApiState } from 'features/db/dbApi';
import { useAppDispatch } from 'store/hooks';

export const AuthStateChangeGuard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authService = useAuthService();
  const [isAuthInitialized, initializeAuth] = useReducer(() => true, false);

  useEffect(() => {
    const goHome = () => navigate('/home');
    const goLogin = () => navigate('/login');
    const resetDbState = () => dispatch(resetDbApiState());

    return authService.onAuthStateChanged(
      juxt([
        initializeAuth,
        ifElse(Boolean, goHome, pipe(resetDbState, goLogin)),
      ]),
    );
  }, [authService, dispatch, navigate]);

  // Prevent rendering the children until the auth state is initialized
  if (!isAuthInitialized) return null;
  return <Outlet />;
};
