import { createContext, useState } from 'react';

import { AuthService } from 'features/auth/service/AuthService';
import { EnhancedAuthService } from 'features/auth/service/EnhancedAuthService';
import { DbService } from 'features/db/DbService';

export const AuthServiceContext = createContext<EnhancedAuthService | null>(
  null,
);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const [authService] = useState(() =>
    EnhancedAuthService.getInstance(
      AuthService.getInstance(),
      DbService.getInstance(),
    ),
  );
  return (
    <AuthServiceContext.Provider value={authService}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
