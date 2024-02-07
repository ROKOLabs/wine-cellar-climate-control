import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuthService } from 'features/auth/hooks/useAuthService';
import {
  resetDbApiState,
  useLazyGetUserDetailsQuerySubscription,
} from 'features/db/dbApi';
import { useAppDispatch } from 'store/hooks';

// TODO: Notify the user about the error getting the details
const handleDetailsError = (error: unknown) =>
  console.error('Error getting user details', error);

export const useAuthStateChanged = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authService = useAuthService();
  const [getDetailsSubscription] = useLazyGetUserDetailsQuerySubscription();

  useEffect(() => {
    return authService.onAuthStateChanged((user) => {
      if (user) {
        getDetailsSubscription(user.uid).catch(handleDetailsError);
        navigate('/home');
      } else {
        dispatch(resetDbApiState());
        navigate('/login');
      }
    });
  }, [authService, dispatch, getDetailsSubscription, navigate]);
};
