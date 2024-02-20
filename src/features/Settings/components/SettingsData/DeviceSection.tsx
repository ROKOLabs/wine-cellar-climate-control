import { Title, Group, Select } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import React from 'react';

type DeviceProps = {
  deviceOptions: { value: string; label: string }[];
  selectedDevice: string;
  handleDeviceChange: (value: string | null) => void;
};

export const DeviceSection: React.FC<DeviceProps> = ({
  deviceOptions,
  selectedDevice,
  handleDeviceChange,
}) => {
  return (
    <>
      <Title order={5}>Device</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <IconBuildingFactory2 style={{ marginRight: '16px' }} />
          Select Device
        </Group>
        <Select
          style={{ width: '120px' }}
          data={deviceOptions}
          value={selectedDevice}
          onChange={handleDeviceChange}
          checkIconPosition="right"
        />
      </Group>
    </>
  );
};
