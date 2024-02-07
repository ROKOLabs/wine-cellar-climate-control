import {
  Stack,
  ActionIcon,
  useMantineColorScheme,
  AppShell,
  Divider,
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

export const NavigationBar = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const goHome = () => navigate('/home');
  const goSettings = () => navigate('/settings');

  // TODO: Replace with the actual user data
  const userInitials = 'JD';

  return (
    <>
      <AppShell.Section>
        <Stack py="md" align="center">
          <Avatar tt="uppercase">{userInitials}</Avatar>
        </Stack>
      </AppShell.Section>

      <Divider />

      <AppShell.Section>
        <Stack py="md" align="center">
          <ActionTooltip label="Home">
            <ActionIcon
              size="xl"
              radius="md"
              variant="filled"
              onClick={juxt([toggleSidebar, goHome])}
            >
              <IconHome2 />
            </ActionIcon>
          </ActionTooltip>
          <ActionTooltip label="Settings">
            <ActionIcon
              size="xl"
              radius="md"
              variant="filled"
              onClick={juxt([toggleSidebar, goSettings])}
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
              onClick={juxt([toggleSidebar, toggleColorScheme])}
            >
              {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </ActionTooltip>
        </Stack>
      </AppShell.Section>
    </>
  );
};
