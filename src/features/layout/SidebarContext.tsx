import { createContext, useState, ReactNode } from 'react';

export const SidebarContext = createContext<{
  isOpen: boolean;
  toggleSidebar: () => void;
}>({
  isOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
