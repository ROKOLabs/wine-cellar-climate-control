import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { NavigationBar } from './components/NavigationBar/NavigationBar';

import { AppShellRoot } from 'features/layout/components/AppShellRoot';
import { Header } from 'features/layout/components/Header/Header';
import { SidebarProvider } from 'features/layout/provider/SidebarProvider';

export const Layout = () => (
  <SidebarProvider>
    <AppShellRoot>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ width: 60 }}>
        <NavigationBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShellRoot>
  </SidebarProvider>
);
