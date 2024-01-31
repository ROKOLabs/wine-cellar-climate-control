import pipe from 'lodash/fp/pipe';
import tap from 'lodash/fp/tap';
import { useEffect } from 'react';

import { AuthService } from 'features/auth/AuthService';
import { setUser } from 'features/auth/authSlice';
import { useAppDispatch } from 'store/hooks';

type OnAuthStateChanged = AuthService['onAuthStateChanged'];

export const useAuthStateChanged = (onAuthStateChanged: OnAuthStateChanged) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return onAuthStateChanged(
      pipe(
        tap((x) => console.log('onAuthStateChanged ->', x)),
        setUser,
        dispatch,
      ),
    );
  }, [dispatch, onAuthStateChanged]);
};
