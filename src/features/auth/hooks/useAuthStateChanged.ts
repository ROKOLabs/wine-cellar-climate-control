import { useEffect } from 'react';
import pipe from 'lodash/fp/pipe';
import { useAppDispatch } from 'store/hooks';
import { setUser } from 'features/auth/authSlice';
import { AuthService } from 'features/auth/AuthService';
import tap from 'lodash/fp/tap';

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
  }, []);
};
