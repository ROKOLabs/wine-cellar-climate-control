import { createContext, useReducer, ReactNode } from 'react';

export const DevToolsVisibilityContext = createContext<boolean>(false);
export const DevToolsToggleContext = createContext<() => void>(() => {});

type DevToolsProviderProps = { children: ReactNode };

export const DevToolsProvider = ({ children }: DevToolsProviderProps) => {
  const [isDevToolsVisible, toggleDevTools] = useReducer((s) => !s, false);

  return (
    <DevToolsVisibilityContext.Provider value={isDevToolsVisible}>
      <DevToolsToggleContext.Provider value={toggleDevTools}>
        {children}
      </DevToolsToggleContext.Provider>
    </DevToolsVisibilityContext.Provider>
  );
};
