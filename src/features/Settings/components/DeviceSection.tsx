import { Title, Group, Select, Paper, Box, Stack } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import { useState } from 'react';

export const DeviceSection = () => {
  const [selectedDevice, setSelectedDevice] = useState('Arduino1');

  const deviceOptions = [
    { value: 'Arduino1', label: 'Arduino 1' },
    { value: 'Arduino2', label: 'Arduino 2' },
  ];

  const handleDeviceChange = (value: string | null) => {
    if (value !== null) {
      setSelectedDevice(value);
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
