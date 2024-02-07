import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { useSidebar } from './hooks/useSidebar';

import { Header } from 'features/layout/components/Header/Header';

export const AppLayout = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 60,
        breakpoint: 'sm',
        collapsed: { mobile: !isOpen },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={isOpen} toggle={toggleSidebar} />
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ width: 60 }}>
        <NavigationBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
