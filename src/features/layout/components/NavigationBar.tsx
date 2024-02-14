import {
  Stack,
  useMantineColorScheme,
  AppShell,
  Divider,
  Avatar,
  ActionIcon,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
} from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';

import { ActionTooltip } from 'components/ActionTooltip';
import { StyledNavLink } from 'components/StyledNavLink';
import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { routes } from 'router/routes';

export const NavigationBar = () => {
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMobile = useIsMobileView();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppShell.Section>
        {isMobile ? (
          <Stack py="md" align="left" pl="sm">
            <Avatar tt="uppercase">JD</Avatar>
          </Stack>
        ) : (
          <Stack py="md" align="center">
            <Avatar tt="uppercase">JD</Avatar>
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
              >
                <IconHome2 style={{ marginRight: '16px' }} />
                Home
              </StyledNavLink>
              <StyledNavLink
                to={routes.settings}
                isActive={isActive(routes.settings)}
                colorScheme={colorScheme}
                onClick={toggleSidebar}
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
                // tooltipLabel="Home"
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
                // tooltipLabel="Settings"
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
