import { D, G } from '@mobily/ts-belt';
import { andThen, ifElse, otherwise, pipe } from 'ramda';
import { useEffect } from 'react';

import { setUser } from 'features/auth/authSlice';
import { isUser } from 'features/auth/guards/guards';
import { EnhancedAuthService } from 'features/auth/service/EnhancedAuthService';
import { useDbService } from 'features/db/useDbService';
import { useAppDispatch } from 'store/hooks';

type OnAuthStateChanged = EnhancedAuthService['onAuthStateChanged'];

// TODO: Notify the user about the invalid details
const onInvalidDetails = () => console.error('Received invalid user details');

// TODO: Notify the user about the error getting the details
const onDetailsError = (error: unknown) =>
  console.error('Error getting user details', error);

export const useAuthStateChanged = (onAuthStateChanged: OnAuthStateChanged) => {
  const dispatch = useAppDispatch();
  const dbService = useDbService();

  useEffect(() => {
    return onAuthStateChanged(
      ifElse(
        G.isNull,
        pipe(setUser, dispatch),
        pipe(
          D.getUnsafe('uid'),
          dbService.getUserDetails,
          andThen(ifElse(isUser, pipe(setUser, dispatch), onInvalidDetails)),
          otherwise(onDetailsError),
        ),
      ),
    );
  }, [dispatch, onAuthStateChanged, dbService]);
};
