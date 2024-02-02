import { AppShell, Burger, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import { useSidebar } from './hooks/useSidebar';

export default function AppLayout() {
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
        <Group h="100%" px="md">
          <Burger
            opened={isOpen}
            onClick={toggleSidebar}
            hiddenFrom="sm"
            size="sm"
          />
          Wine Cellar Climate Control
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ width: 60 }}>
        <NavigationBar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
