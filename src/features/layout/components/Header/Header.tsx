import { ActionIcon, Burger, Group, Title } from '@mantine/core';
import { IconGlassFullFilled, IconLogout, IconUser } from '@tabler/icons-react';

import styles from './Header.module.css';

import { IconTooltip } from 'features/layout/components/IconTooltip';

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export const Header = (props: HeaderProps) => {
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
          opened={props.opened}
          onClick={props.toggle}
        />
        <IconGlassFullFilled className={styles.logo} />
        <Title order={3} className={styles.title}>
          Wine Cellar
        </Title>
      </Group>

      {userLoggedIn ? (
        <IconTooltip label="Log out">
          <ActionIcon
            size="lg"
            radius="md"
            variant="subtle"
            onClick={handleLogout}
          >
            <IconLogout size={22} />
          </ActionIcon>
        </IconTooltip>
      ) : (
        <IconTooltip label="User profile">
          <ActionIcon size="lg" radius="md" variant="subtle">
            <IconUser size={22} />
          </ActionIcon>
        </IconTooltip>
      )}
    </Group>
  );
};
