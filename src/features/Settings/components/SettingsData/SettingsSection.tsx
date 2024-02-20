import { Title, Group, Switch } from '@mantine/core';
import { IconMoon, IconTool, IconExclamationCircle } from '@tabler/icons-react';
import React from 'react';

type SettingsProps = {
  isDarkTheme: boolean;
  toggleColorScheme: () => void;
  showDevTools: boolean;
  toggleDevTools: () => void;
  showErrors: boolean;
  setShowErrors: (value: boolean) => void;
};

export const SettingsSection: React.FC<SettingsProps> = ({
  isDarkTheme,
  toggleColorScheme,
  showDevTools,
  toggleDevTools,
  showErrors,
  setShowErrors,
}) => {
  return (
    <>
      <Title order={5}>Settings</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <IconMoon style={{ marginRight: '16px' }} />
          Dark Theme
        </Group>
        <Switch checked={isDarkTheme} onChange={toggleColorScheme} />
      </Group>

      <Group justify="space-between">
        <Group gap="xs">
          <IconTool style={{ marginRight: '16px' }} />
          Developer menu
        </Group>
        <Switch checked={showDevTools} onChange={toggleDevTools} />
      </Group>

      <Group justify="space-between">
        <Group gap="xs">
          <IconExclamationCircle style={{ marginRight: '16px' }} />
          Show all errors
        </Group>
        <Switch
          checked={showErrors}
          onChange={(event) => setShowErrors(event.currentTarget.checked)}
        />
      </Group>
    </>
  );
};
