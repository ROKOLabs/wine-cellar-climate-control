import { AuthServiceContext } from 'features/auth/AuthProvider';
import { useContext } from 'react';

export const useAuthService = () => useContext(AuthServiceContext);
