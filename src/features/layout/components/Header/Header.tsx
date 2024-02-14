import {
  ActionIcon,
  Avatar,
  Burger,
  Group,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  IconGlassFullFilled,
  IconLogout,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';

import styles from './Header.module.css';

import { ActionTooltip } from 'components/ActionTooltip';
import { useGetAuthStateQuery, useLogoutMutation } from 'features/auth/authApi';
import { useAuth } from 'features/auth/hooks/useAuth';
import { useGetUserDetailsQuery } from 'features/db/dbApi';
import { useSidebar } from 'features/layout/hooks/useSidebar';
import { getUserInitials } from 'features/layout/utils/getUserInitials';

export const Header = () => {
  const [isOpen, toggleSidebar] = useSidebar();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [logout] = useLogoutMutation();
  const { data: currentUser } = useGetAuthStateQuery();
  const { currentUserUid: userUid } = useAuth();
  const { currentData: userDetails } = useGetUserDetailsQuery(
    userUid ?? skipToken,
  );

  const userLoggedIn = Boolean(currentUser);

  const handleLogout = () =>
    logout().catch(() => {
      notifications.show({
        title: 'Logout Error',
        message: 'An error occurred while logging out. Please try again later.',
        color: 'red',
        withBorder: true,
        withCloseButton: true,
      });
    });

  return (
    <Group gap="xs" px="md" h="100%" justify="space-between">
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

      <ActionTooltip
        label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <ActionIcon
          size="lg"
          radius="md"
          variant="subtle"
          onClick={toggleColorScheme}
        >
          {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
        </ActionIcon>
      </ActionTooltip>

      {userLoggedIn ? (
        <>
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
          <Avatar tt="uppercase">{getUserInitials(userDetails)}</Avatar>
        </>
      ) : null}
    </Group>
  );
};
