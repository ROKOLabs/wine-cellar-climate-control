import {
  Stack,
  ActionIcon,
  useMantineColorScheme,
  AppShell,
  Divider,
  NavLink,
  Avatar,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
} from '@tabler/icons-react';
import { juxt } from 'ramda';
import { useNavigate } from 'react-router-dom';

import { ActionTooltip } from 'components/ActionTooltip';
import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { useIsMobileView } from 'hooks/useIsMobileView';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMobile = useIsMobileView();

  const goHome = () => navigate('/home');
  const goSettings = () => navigate('/settings');

  // TODO: Replace with the actual user data
  const userInitials = 'JD';

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
              <NavLink
                label="Home"
                leftSection={<IconHome2 />}
                onClick={juxt([toggleSidebar, goHome])}
              />
              <NavLink
                label="Settings"
                leftSection={<IconSettings />}
                onClick={juxt([toggleSidebar, goSettings])}
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
