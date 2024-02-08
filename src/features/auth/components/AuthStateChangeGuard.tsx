import { ifElse, juxt, once, pipe } from 'ramda';
import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { setAuthenticated } from 'features/auth/authSlice';
import { useAuthService } from 'features/auth/hooks/useAuthService';
import { resetDbApiState } from 'features/db/dbApi';
import { useAppDispatch } from 'store/hooks';

export const AuthStateChangeGuard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authService = useAuthService();
  const [isInitialized, initialize] = useReducer(() => true, false);

  useEffect(() => {
    const goHome = () => navigate('/home');
    const goLogin = () => navigate('/login');
    const initializeOnce = once(initialize);

    const dispatchResetDbApiState = pipe(resetDbApiState, dispatch);
    const dispatchAuthenticated = pipe(Boolean, setAuthenticated, dispatch);
    const unauthorizedFlow = juxt([dispatchResetDbApiState, goLogin]);

    return authService.onAuthStateChanged(
      juxt([
        initializeOnce,
        dispatchAuthenticated,
        ifElse(Boolean, goHome, unauthorizedFlow),
      ]),
    );
  }, [authService, dispatch, navigate]);

  // Prevent rendering the children until the auth state is initialized
  if (!isInitialized) return null;
  return <Outlet />;
};
