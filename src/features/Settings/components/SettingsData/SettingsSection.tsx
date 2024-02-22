import {
  Box,
  Group,
  Paper,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconTool, IconExclamationCircle } from '@tabler/icons-react';
import { useState } from 'react';

import { useDevToolsVisibility } from 'components/DevTools/hooks/useDevToolsVisibility';

type SettingsSectionProps = {
  toggleDevTools: () => void;
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  toggleDevTools,
}: SettingsSectionProps) => {
  const showDevTools = useDevToolsVisibility();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [showErrors, setShowErrors] = useState(false);
  const isDarkTheme = colorScheme === 'dark';

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
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
        <Switch checked={showDevTools} onChange={toggleDevTools} />
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
    </Paper>
  );
};
