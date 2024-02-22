import { Title, Group, Switch, Paper, Box } from '@mantine/core';
import { IconBulb, IconPropeller } from '@tabler/icons-react';

import { useGetSettingsQuery, useSetSettingsMutation } from 'features/db/dbApi';

export const ControlSection = () => {
  const [setSettings] = useSetSettingsMutation();
  const { data } = useGetSettingsQuery('0');

  const handleLEDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    setSettings({
      arduinoId: '0',
      settings: { ...data, led: value ? 1 : 0 },
    });
  };

  const handleFanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    setSettings({
      arduinoId: '0',
      settings: { ...data, fan: value ? 1 : 0 },
    });
  };

  {
    return (
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Title order={5}>Control</Title>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconBulb} mr="md" />
            LED switch
          </Group>
          <Switch checked={Boolean(data?.led)} onChange={handleLEDChange} />
        </Group>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconPropeller} mr="md" />
            Fan switch
          </Group>
          <Switch checked={Boolean(data?.fan)} onChange={handleFanChange} />
        </Group>
      </Paper>
    );
  }
};
