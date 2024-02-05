import { G, F } from '@mobily/ts-belt';
import { andThen, ifElse, otherwise, pipe } from 'ramda';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { User, setUser } from 'features/auth/authSlice';
import { useAuthService } from 'features/auth/hooks/useAuthService';
import { useDbService } from 'features/db/useDbService';
import { useAppDispatch } from 'store/hooks';

type WithUid<T> = T & { uid: string };

// TODO: Notify the user about the error getting the details
const onDetailsError = (error: unknown) =>
  console.error('Error getting user details', error);

const parseUserDetails = (user: User | undefined): User => ({
  email: user?.email || 'no email',
  lastname: user?.lastname || 'no lastname',
  name: user?.name || 'no name',
  username: user?.username || 'no username',
});

export const useAuthStateChanged = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authService = useAuthService();
  const dbService = useDbService();

  useEffect(() => {
    const goToHome = () => navigate('/home');
    const goToLogin = () => navigate('/login');
    const getUserDetails = <T>(user: WithUid<T>) =>
      dbService.getUserDetails(user.uid);

    const dispatchUserPipe = pipe(setUser, dispatch);

    return authService.onAuthStateChanged(
      ifElse(
        G.isNotNullable,
        pipe(
          getUserDetails,
          andThen(parseUserDetails),
          andThen(dispatchUserPipe),
          andThen(goToHome),
          otherwise(onDetailsError),
        ),
        pipe(
          F.always(null), //
          dispatchUserPipe,
          goToLogin,
        ),
      ),
    );
  }, [dispatch, navigate, authService, dbService]);
};
