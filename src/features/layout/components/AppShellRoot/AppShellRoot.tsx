import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';

import classes from './AppShellRoot.module.css';

import { useSidebar } from 'features/layout/hooks/useSidebar';

type AppLayoutProps = { children: ReactNode };

export const AppShellRoot = ({ children }: AppLayoutProps) => {
  const [isOpen] = useSidebar();

  return (
    <AppShell
      padding={{ base: 'sm', sm: 'xl' }}
      header={{ height: { base: 56 } }}
      navbar={{
        width: { base: 56 },
        breakpoint: 'sm',
        collapsed: { mobile: !isOpen },
      }}
      classNames={{ main: classes.main }}
    >
      {children}
    </AppShell>
  );
};
