import { ActionIcon, Burger, Group, Title } from '@mantine/core';
import { IconGlassFullFilled, IconLogout, IconUser } from '@tabler/icons-react';

import styles from './Header.module.css';

import { ActionTooltip } from 'components/ActionTooltip';
import { useSidebar } from 'features/layout/hooks/useSidebar';

export const Header = () => {
  const [isOpen, toggleSidebar] = useSidebar();

  // TODO: Check if the user is logged in
  const userLoggedIn = true;

  // TODO: Add logout functionality
  const handleLogout = () => {
    throw new Error('Not implemented');
  };

  return (
    <Group gap={0} px="md" h="100%" justify="space-between">
      <Group style={{ flex: 1 }}>
        <Burger
          size="sm"
          hiddenFrom="sm"
          opened={isOpen}
          onClick={toggleSidebar}
        />
        <IconGlassFullFilled className={styles.logo} />
        <Title order={3} className={styles.title}>
          Wine Cellar
        </Title>
      </Group>

      {userLoggedIn ? (
        <ActionTooltip label="Log out">
          <ActionIcon
            size="lg"
            radius="md"
            variant="subtle"
            onClick={handleLogout}
          >
            <IconLogout size={22} />
          </ActionIcon>
        </ActionTooltip>
      ) : (
        <ActionTooltip label="User profile">
          <ActionIcon size="lg" radius="md" variant="subtle">
            <IconUser size={22} />
          </ActionIcon>
        </ActionTooltip>
      )}
    </Group>
  );
};
