import { useContext } from 'react';

import { AuthServiceContext } from 'features/auth/AuthProvider';

export const useAuthService = () => {
  const authService = useContext(AuthServiceContext);
  if (!authService)
    throw new Error('useAuthService must be used within an AuthProvider');
  return authService;
};
