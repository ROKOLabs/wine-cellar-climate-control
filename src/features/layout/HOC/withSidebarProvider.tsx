import { SidebarProvider } from 'features/layout/SidebarContext';

export const withSidebarProvider = (Component: React.ComponentType) => {
  const WithSidebarProvider = () => {
    return (
      <SidebarProvider>
        <Component />
      </SidebarProvider>
    );
  };

  return WithSidebarProvider;
};
