import { Title, Group, TextInput, Stack } from '@mantine/core';
import {
  IconFoldUp,
  IconFoldDown,
  IconDropletHalf2Filled,
  IconChartBubble,
  IconTemperatureSun,
  IconReload,
} from '@tabler/icons-react';
import React from 'react';

type SensorsProps = {
  updateInterval: number;
  setUpdateInterval: (value: number) => void;
  tempUpperLimit: number;
  setTempUpperLimit: (value: number) => void;
  tempLowerLimit: number;
  setTempLowerLimit: (value: number) => void;
  humidityUpperLimit: number;
  setHumidityUpperLimit: (value: number) => void;
  humidityLowerLimit: number;
  setHumidityLowerLimit: (value: number) => void;
  co2UpperLimit: number;
  setCO2UpperLimit: (value: number) => void;
  co2LowerLimit: number;
  setCO2LowerLimit: (value: number) => void;
};

export const SensorsSection: React.FC<SensorsProps> = ({
  updateInterval,
  setUpdateInterval,
  tempUpperLimit,
  setTempUpperLimit,
  tempLowerLimit,
  setTempLowerLimit,
  humidityUpperLimit,
  setHumidityUpperLimit,
  humidityLowerLimit,
  setHumidityLowerLimit,
  co2UpperLimit,
  setCO2UpperLimit,
  co2LowerLimit,
  setCO2LowerLimit,
}) => {
  return (
    <>
      <Title order={5}>Sensors</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <IconReload style={{ marginRight: '16px' }} />
          Update Interval
        </Group>
        <TextInput
          type="number"
          style={{ width: '50px' }}
          value={updateInterval}
          onChange={(event) =>
            setUpdateInterval(Number(event.currentTarget.value))
          }
        />
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconTemperatureSun style={{ marginRight: '16px' }} />
            Temperature
          </Group>
        </Group>
        <Stack gap="xs" style={{ marginLeft: '30px', width: '100%' }}>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldUp style={{ marginRight: '16px' }} />
              Upper Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={tempUpperLimit}
              onChange={(event) =>
                setTempUpperLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldDown style={{ marginRight: '16px' }} />
              Lower Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={tempLowerLimit}
              onChange={(event) =>
                setTempLowerLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
        </Stack>
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconDropletHalf2Filled style={{ marginRight: '16px' }} />
            Humidity
          </Group>
        </Group>
        <Stack gap="xs" style={{ marginLeft: '30px', width: '100%' }}>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldUp style={{ marginRight: '16px' }} />
              Upper Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={humidityUpperLimit}
              onChange={(event) =>
                setHumidityUpperLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldDown style={{ marginRight: '16px' }} />
              Lower Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={humidityLowerLimit}
              onChange={(event) =>
                setHumidityLowerLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
        </Stack>
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconChartBubble style={{ marginRight: '16px' }} />
            CO2
          </Group>
        </Group>
        <Stack gap="xs" style={{ marginLeft: '30px', width: '100%' }}>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldUp style={{ marginRight: '16px' }} />
              Upper Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={co2UpperLimit}
              onChange={(event) =>
                setCO2UpperLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <IconFoldDown style={{ marginRight: '16px' }} />
              Lower Limit
            </Group>
            <TextInput
              style={{ width: '50px' }}
              type="number"
              value={co2LowerLimit}
              onChange={(event) =>
                setCO2LowerLimit(Number(event.currentTarget.value))
              }
            />
          </Group>
        </Stack>
      </Group>
    </>
  );
};
