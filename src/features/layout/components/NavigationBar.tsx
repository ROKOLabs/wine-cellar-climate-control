import {
  Stack,
  useMantineColorScheme,
  AppShell,
  Divider,
  Avatar,
  ActionIcon,
} from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
} from '@tabler/icons-react';
import { useLocation, NavLink as RRNavLink } from 'react-router-dom';

import styles from './NavigationBar.module.css';

import { ActionTooltip } from 'components/ActionTooltip';
import { useGetAuthStateQuery } from 'features/auth/authApi';
import { useAuth } from 'features/auth/hooks/useAuth';
import { useGetUserDetailsQuery } from 'features/db/dbApi';
import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { getUserInitials } from 'features/layout/utils/getUserInitials';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { routes } from 'router/routes';

export const NavigationBar = () => {
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMobile = useIsMobileView();

  const { currentUserUid: userUid } = useAuth();
  const { currentData: userDetails } = useGetUserDetailsQuery(
    userUid ?? skipToken,
  );

  const { data: userLoggedIn } = useGetAuthStateQuery();
  const userInitials = getUserInitials(userDetails);

  const location = useLocation();
  const isRouteActive = (route: string) => {
    const isActive = location.pathname === route;
    return isActive;
  };

  return (
    <>
      <AppShell.Section>
        {isMobile ? (
          <Stack py="md" align="left" pl="sm">
            <Avatar tt="uppercase">{userInitials}</Avatar>
          </Stack>
        ) : (
          <Stack py="md" align="center">
            <Avatar tt="uppercase">{userInitials}</Avatar>
          </Stack>
        )}
      </AppShell.Section>
      <Divider />

      <AppShell.Section>
        <Stack py="md" align="center">
          {isMobile ? (
            <>
              <ActionIcon
                component={RRNavLink}
                to={routes.dashboard}
                variant="subtle"
                className={`${styles.actionIcon} ${isRouteActive(routes.dashboard) && styles.active} ${styles.actionIconMobile} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                disabled={!userLoggedIn}
                size="xl"
                radius="md"
                onClick={toggleSidebar}
              >
                <IconHome2 style={{ marginRight: '16px' }} /> Home
              </ActionIcon>
              <ActionIcon
                component={RRNavLink}
                to={routes.settings}
                variant="subtle"
                className={`${styles.actionIcon} ${isRouteActive(routes.settings) && styles.active} ${styles.actionIconMobile} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                disabled={!userLoggedIn}
                size="xl"
                radius="md"
                onClick={toggleSidebar}
              >
                <IconSettings style={{ marginRight: '16px' }} /> Settings
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionTooltip label={'Home'}>
                <ActionIcon
                  component={RRNavLink}
                  to={routes.dashboard}
                  variant="subtle"
                  disabled={!userLoggedIn}
                  size="xl"
                  radius="md"
                  className={`${styles.actionIcon} ${isRouteActive(routes.dashboard) && styles.active} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                >
                  <IconHome2 />
                </ActionIcon>
              </ActionTooltip>
              <ActionTooltip label={'Settings'}>
                <ActionIcon
                  component={RRNavLink}
                  to={routes.settings}
                  variant="subtle"
                  disabled={!userLoggedIn}
                  size="xl"
                  radius="md"
                  className={`${styles.actionIcon} ${isRouteActive(routes.settings) && styles.active} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                >
                  <IconSettings />
                </ActionIcon>
              </ActionTooltip>
            </>
          )}
        </Stack>
      </AppShell.Section>

      <Divider />

      <AppShell.Section>
        <Stack py="md" align="center">
          {isMobile ? (
            <>
              <ActionIcon
                style={{
                  backgroundColor: 'transparent',
                }}
                className={`${styles.actionIcon} ${styles.actionIconMobile} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                onClick={toggleColorScheme}
              >
                {colorScheme === 'dark' ? (
                  <IconSun style={{ marginRight: '16px' }} />
                ) : (
                  <IconMoon style={{ marginRight: '16px' }} />
                )}
                Switch to {colorScheme === 'dark' ? 'light' : 'dark'} mode
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionTooltip
                label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <ActionIcon
                  size="xl"
                  radius="md"
                  onClick={toggleColorScheme}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  className={`${styles.actionIcon} ${colorScheme === 'dark' ? styles.dark : styles.light}`}
                >
                  {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                </ActionIcon>
              </ActionTooltip>
            </>
          )}
        </Stack>
      </AppShell.Section>
    </>
  );
};
