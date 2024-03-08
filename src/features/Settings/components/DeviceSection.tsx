import { Title, Group, Select, Paper, Box, Stack } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';

import {
  SettingsState,
  selectSelectedDevice,
  setSelectedDevice,
} from 'features/Settings/settingsSlice2';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const DeviceSection = () => {
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const dispatch = useAppDispatch();

  const deviceOptions = [
    { value: '0' as SettingsState['selectedDevice'], label: 'Arduino 1' },
    { value: '1' as SettingsState['selectedDevice'], label: 'Arduino 2' },
    { value: '2' as SettingsState['selectedDevice'], label: 'Arduino 3' },
  ];

  const handleDeviceChange = (value: string | null) => {
    dispatch(setSelectedDevice(value));
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Stack>
        <Title order={5}>Device</Title>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconBuildingFactory2} mr="md" />
            Select Device
          </Group>
          <Select
            w={120}
            data={deviceOptions}
            value={selectedDevice}
            defaultValue={selectedDevice}
            onChange={handleDeviceChange}
            checkIconPosition="right"
          />
        </Group>
      </Stack>
    </Paper>
  );
};
