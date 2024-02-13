import { useEffect, useState } from 'react';

import { AuthService } from 'features/auth/AuthService';
import { AuthServiceContext } from 'features/auth/AuthServiceContext';

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const [authService] = useState(() => AuthService.getInstance());
  const [initialized, setInitialized] = useState(authService.initialized);

  useEffect(() => {
    authService.initialize().then(setInitialized);
  }, [authService]);

  if (!initialized) return null;
  return (
    <AuthServiceContext.Provider value={authService}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
