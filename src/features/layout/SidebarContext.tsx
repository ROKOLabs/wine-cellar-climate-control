import {
  createContext,
  DispatchWithoutAction,
  ReactNode,
  useReducer,
} from 'react';

export const SidebarContext = createContext<boolean | null>(null);
export const SidebarDispatchContext =
  createContext<DispatchWithoutAction | null>(null);

type SidebarProviderProps = { children: ReactNode };

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, toggleSidebar] = useReducer((s) => !s, false);

  return (
    <SidebarContext.Provider value={isOpen}>
      <SidebarDispatchContext.Provider value={toggleSidebar}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarContext.Provider>
  );
};
