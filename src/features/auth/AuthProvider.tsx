import { createContext } from 'vm';

export type AuthContextType = {};

export const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
