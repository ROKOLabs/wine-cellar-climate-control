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
import { useLocation } from 'react-router-dom';

import { ActionTooltip } from 'components/ActionTooltip';
import { StyledNavLink } from 'components/StyledNavLink';
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

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { currentUserUid: userUid } = useAuth();
  const { currentData: userDetails } = useGetUserDetailsQuery(
    userUid ?? skipToken,
  );

  const { data: userLoggedIn } = useGetAuthStateQuery();
  const userInitials = getUserInitials(userDetails);

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
              <StyledNavLink
                to={routes.dashboard}
                isActive={isActive(routes.dashboard)}
                colorScheme={colorScheme}
                onClick={toggleSidebar}
                disabled={!userLoggedIn}
              >
                <IconHome2 style={{ marginRight: '16px' }} />
                Home
              </StyledNavLink>
              <StyledNavLink
                to={routes.settings}
                isActive={isActive(routes.settings)}
                colorScheme={colorScheme}
                onClick={toggleSidebar}
                disabled={!userLoggedIn}
              >
                <IconSettings style={{ marginRight: '16px' }} />
                Settings
              </StyledNavLink>
            </>
          ) : (
            <>
              <StyledNavLink
                to={routes.dashboard}
                isActive={isActive(routes.dashboard)}
                colorScheme={colorScheme}
                style={{
                  justifyContent: 'center',
                }}
                disabled={!userLoggedIn}
                tooltipLabel="Home"
              >
                <IconHome2 />
              </StyledNavLink>
              <StyledNavLink
                to={routes.settings}
                isActive={isActive(routes.settings)}
                colorScheme={colorScheme}
                style={{
                  justifyContent: 'center',
                }}
                disabled={!userLoggedIn}
                tooltipLabel="Settings"
              >
                <IconSettings />
              </StyledNavLink>
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
                  color: colorScheme === 'dark' ? 'white' : 'black',
                  padding: '8px',
                  justifyContent: 'start',
                  width: '90%',
                }}
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
                    color: colorScheme === 'dark' ? 'white' : 'black',
                  }}
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
