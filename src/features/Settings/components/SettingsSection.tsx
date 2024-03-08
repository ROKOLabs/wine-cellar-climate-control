import {
  Box,
  Group,
  Paper,
  Stack,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconTool, IconExclamationCircle } from '@tabler/icons-react';

import { useDevToolsOpen } from 'components/DevTools/hooks/useDevToolsOpen';
import { toggleDevTools } from 'components/DevTools/provider/DevToolsSlice';
import {
  selectShowErrors,
  toggleDarkTheme,
  toggleShowErrors,
} from 'features/Settings/settingsSlice2';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const SettingsSection = () => {
  const showDevTools = useDevToolsOpen();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const showErrors = useAppSelector(selectShowErrors);
  const isDarkTheme = colorScheme === 'dark';
  const dispatch = useAppDispatch();

  const toggleDevToolsHandler = () => {
    dispatch(toggleDevTools());
  };

  const handleToggleTheme = () => {
    dispatch(toggleDarkTheme());
    toggleColorScheme();
  };

  const handleToggleErrors = () => {
    dispatch(toggleShowErrors());
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Stack>
        <Title order={5}>Settings</Title>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconMoon} mr="md" />
            Dark Theme
          </Group>
          <Switch checked={isDarkTheme} onChange={handleToggleTheme} />
        </Group>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconTool} mr="md" />
            Developer menu
          </Group>
          <Switch checked={showDevTools} onChange={toggleDevToolsHandler} />
        </Group>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconExclamationCircle} mr="md" />
            Show all errors
          </Group>
          <Switch checked={showErrors} onChange={handleToggleErrors} />
        </Group>
      </Stack>
    </Paper>
  );
};
