import { createContext, useState } from 'react';

import { AuthService } from 'features/auth/AuthService';

export const AuthServiceContext = createContext<AuthService | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const [authService] = useState(() => AuthService.getInstance());
  return (
    <AuthServiceContext.Provider value={authService}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
