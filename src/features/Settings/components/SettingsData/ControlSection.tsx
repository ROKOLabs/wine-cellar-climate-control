import { Title, Group, Switch } from '@mantine/core';
import { IconBulb, IconPropeller } from '@tabler/icons-react';
import React from 'react';

type ControlProps = {
  ledOn: boolean;
  setLedOn: (value: boolean) => void;
  fanOn: boolean;
  setFanOn: (value: boolean) => void;
  handleSaveSettings: () => void;
  updateInterval: number;
  setUpdateInterval: (value: number) => void;
};

export const ControlSection: React.FC<ControlProps> = ({
  ledOn,
  setLedOn,
  fanOn,
  setFanOn,
}) => {
  return (
    <>
      <Title order={5}>Control</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <IconBulb style={{ marginRight: '16px' }} />
          LED switch
        </Group>
        <Switch
          checked={ledOn}
          onChange={(event) => setLedOn(event.currentTarget.checked)}
        />
      </Group>

      <Group justify="space-between">
        <Group gap="xs">
          <IconPropeller style={{ marginRight: '16px' }} />
          Fan switch
        </Group>
        <Switch
          checked={fanOn}
          onChange={(event) => setFanOn(event.currentTarget.checked)}
        />
      </Group>
    </>
  );
};
