import { selectIsAuthenticated } from 'features/auth/authSlice';
import { useAppSelector } from 'store/hooks';

export const useIsAuthenticated = () => useAppSelector(selectIsAuthenticated);
