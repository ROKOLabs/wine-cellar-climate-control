import { createContext } from 'react';
import { authService } from 'features/auth/AuthService';
import { useAuthStateChanged } from 'features/auth/hooks/useAuthStateChanged';

export type AuthServiceContextType = {};

export const AuthServiceContext = createContext(authService);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  useAuthStateChanged(authService.onAuthStateChanged);
  return (
    <AuthServiceContext.Provider value={authService}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
