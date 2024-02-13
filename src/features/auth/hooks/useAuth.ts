import { useContext } from 'react';

import { AuthServiceContext } from 'features/auth/AuthServiceContext';

export const useAuth = () => {
  const authService = useContext(AuthServiceContext);
  if (!authService)
    throw new Error('useAuthService must be used within an AuthProvider');
  return authService;
};
