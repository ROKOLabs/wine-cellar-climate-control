import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { NavigationBar } from './components/NavigationBar/NavigationBar';

import { AppShellRoot } from 'features/layout/components/AppShellRoot/AppShellRoot';
import { Header } from 'features/layout/components/Header/Header';
import { SidebarProvider } from 'features/layout/provider/SidebarProvider';

export const Layout = () => (
  <SidebarProvider>
    <AppShellRoot>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavigationBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShellRoot>
  </SidebarProvider>
);
