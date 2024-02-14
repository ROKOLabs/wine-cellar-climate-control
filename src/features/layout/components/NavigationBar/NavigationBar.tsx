import {
  Stack,
  ActionIcon,
  useMantineColorScheme,
  AppShell,
  NavLink,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
  IconHistory,
} from '@tabler/icons-react';
import { juxt } from 'ramda';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';

import styles from './NavigationBar.module.css';

import { ActionTooltip } from 'components/ActionTooltip';
import { useGetAuthStateQuery } from 'features/auth/authApi';
import { useSidebarDispatch } from 'features/layout/hooks/useSidebarDispatch';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { routes } from 'router/routes';
import { preventDefault } from 'utility/preventDefault';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobileView();
  const toggleSidebar = useSidebarDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { data: currentUser } = useGetAuthStateQuery();
  const userLoggedIn = Boolean(currentUser);

  const goDashboard = () => navigate(routes.dashboard);
  const goSettings = () => navigate(routes.settings);
  const goHistory = () => navigate(routes.history);

  if (isMobile)
    return (
      <AppShell.Section>
        <Stack py="md">
          <NavLink
            label="Home"
            leftSection={<IconHome2 />}
            onClick={juxt([toggleSidebar, goDashboard])}
            disabled={!userLoggedIn}
          />
          <NavLink
            label="History"
            leftSection={<IconSettings />}
            onClick={juxt([toggleSidebar, goHistory])}
            disabled={!userLoggedIn}
          />
          <NavLink
            label="Settings"
            leftSection={<IconSettings />}
            onClick={juxt([toggleSidebar, goSettings])}
            disabled={!userLoggedIn}
          />
          <NavLink
            label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
            leftSection={colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
            onClick={juxt([toggleSidebar, toggleColorScheme])}
          />
        </Stack>
      </AppShell.Section>
    );

  return (
    <AppShell.Section>
      <Stack py="md" align="center">
        <ActionTooltip label="Home">
          <ActionIcon
            component={RouterNavLink}
            to={routes.dashboard}
            size="xl"
            radius="md"
            variant="light"
            className={styles.actionIcon}
            disabled={!userLoggedIn}
            onClick={!userLoggedIn ? preventDefault : undefined}
          >
            <IconHome2 />
          </ActionIcon>
        </ActionTooltip>
        <ActionTooltip label="History">
          <ActionIcon
            component={RouterNavLink}
            to={routes.history}
            size="xl"
            radius="md"
            variant="light"
            className={styles.actionIcon}
            disabled={!userLoggedIn}
            onClick={!userLoggedIn ? preventDefault : undefined}
          >
            <IconHistory />
          </ActionIcon>
        </ActionTooltip>
        <ActionTooltip label="Settings">
          <ActionIcon
            component={RouterNavLink}
            to={routes.settings}
            size="xl"
            radius="md"
            variant="light"
            className={styles.actionIcon}
            disabled={!userLoggedIn}
            onClick={!userLoggedIn ? preventDefault : undefined}
          >
            <IconSettings />
          </ActionIcon>
        </ActionTooltip>
      </Stack>
    </AppShell.Section>
  );
};
