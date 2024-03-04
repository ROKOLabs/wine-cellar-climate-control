import { Title, Group, Select, Paper, Box, Stack } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';

import { setSelectedDevice } from 'features/Settings/SettingsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const DeviceSection = () => {
  const selectedDevice = useAppSelector(
    (state) => state.settings.selectedDevice,
  );
  const dispatch = useAppDispatch();

  const deviceOptions = [
    { value: '0', label: 'Arduino 1' },
    { value: '1', label: 'Arduino 2' },
    { value: '2', label: 'Arduino 3' },
  ];

  const handleDeviceChange = (value: string | null) => {
    if (value !== null) {
      dispatch(setSelectedDevice(value as '0' | '1' | '2'));
    }
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
            onChange={handleDeviceChange}
            checkIconPosition="right"
          />
        </Group>
      </Stack>
    </Paper>
  );
};
