import { createContext } from 'react';
import { authService } from 'features/auth/AuthService';
import { useAuthStateChanged } from 'features/auth/hooks/useAuthStateChanged';

export type AuthContextType = {};

export const AuthContext = createContext(authService);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  useAuthStateChanged(authService.onAuthStateChanged);
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  );
};
