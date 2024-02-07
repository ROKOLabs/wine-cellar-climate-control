import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';

import { useSidebar } from 'features/layout/hooks/useSidebar';

type AppLayoutProps = { children: ReactNode };

export const AppShellRoot = ({ children }: AppLayoutProps) => {
  const [isOpen] = useSidebar();

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
      {children}
    </AppShell>
  );
};
