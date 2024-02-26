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
import { useState } from 'react';

import { useDevToolsOpen } from 'components/DevTools/hooks/useDevToolsOpen';
import { toggleDevTools } from 'components/DevTools/provider/DevToolsSlice';
import { useAppDispatch } from 'store/hooks';

export const SettingsSection = () => {
  const showDevTools = useDevToolsOpen();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [showErrors, setShowErrors] = useState(false);
  const isDarkTheme = colorScheme === 'dark';
  const dispatch = useAppDispatch();

  const toggleDevToolsHandler = () => {
    dispatch(toggleDevTools());
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
          <Switch checked={isDarkTheme} onChange={toggleColorScheme} />
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
          <Switch
            checked={showErrors}
            onChange={(value) => setShowErrors(value.currentTarget.checked)}
          />
        </Group>
      </Stack>
    </Paper>
  );
};
