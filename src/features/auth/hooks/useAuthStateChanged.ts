import { useEffect } from 'react';
import pipe from 'lodash/fp/pipe';
import { useAppDispatch } from 'store/hooks';
import { setUser } from 'features/auth/authSlice';
import { AuthService } from 'features/auth/AuthService';

type OnAuthStateChanged = AuthService['onAuthStateChanged'];

export const useAuthStateChanged = (onAuthStateChanged: OnAuthStateChanged) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return onAuthStateChanged(pipe(setUser, dispatch));
  }, []);
};
