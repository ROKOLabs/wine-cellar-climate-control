import {
  Stack,
  ActionIcon,
  useMantineColorScheme,
  AppShell,
  Divider,
  NavLink,
  Avatar,
} from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
} from '@tabler/icons-react';
import { juxt } from 'ramda';
import { useNavigate } from 'react-router-dom';

import { ActionTooltip } from 'components/ActionTooltip';
import { useAuthService } from 'features/auth/hooks/useAuthService';
import { useIsAuthenticated } from 'features/auth/hooks/useIsAuthenticated';
import { useGetUserDetailsQuery } from 'features/db/dbApi';
import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { useIsMobileView } from 'hooks/useIsMobileView';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMobile = useIsMobileView();

  const goHome = () => navigate('/home');
  const goSettings = () => navigate('/settings');

  const { userUid } = useAuthService();
  const { data: userDetails } = useGetUserDetailsQuery(userUid ?? skipToken);
  const userLoggedIn = useIsAuthenticated();

  const userInitials =
    userDetails?.name && userDetails?.lastname
      ? `${userDetails.name.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
      : '';

  return (
    <>
      {userLoggedIn && (
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
      )}
      <Divider />

      <AppShell.Section>
        <Stack py="md" align="center">
          {isMobile ? (
            <>
              <NavLink
                label="Home"
                leftSection={<IconHome2 />}
                onClick={
                  userLoggedIn ? juxt([toggleSidebar, goHome]) : undefined
                }
                style={!userLoggedIn ? { color: 'gray' } : undefined}
              />
              <NavLink
                label="Settings"
                leftSection={<IconSettings />}
                onClick={
                  userLoggedIn ? juxt([toggleSidebar, goSettings]) : undefined
                }
                style={!userLoggedIn ? { color: 'gray' } : undefined}
              />
              <NavLink
                label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
                leftSection={
                  colorScheme === 'dark' ? <IconSun /> : <IconMoon />
                }
                onClick={juxt([toggleSidebar, toggleColorScheme])}
              />
            </>
          ) : (
            <>
              <ActionTooltip label="Home">
                <ActionIcon
                  size="xl"
                  radius="md"
                  variant="filled"
                  onClick={goHome}
                  disabled={!userLoggedIn}
                >
                  <IconHome2 />
                </ActionIcon>
              </ActionTooltip>
              <ActionTooltip label="Settings">
                <ActionIcon
                  size="xl"
                  radius="md"
                  variant="filled"
                  onClick={goSettings}
                  disabled={!userLoggedIn}
                >
                  <IconSettings />
                </ActionIcon>
              </ActionTooltip>
              <ActionTooltip
                label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <ActionIcon
                  size="xl"
                  radius="md"
                  variant="filled"
                  onClick={toggleColorScheme}
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
