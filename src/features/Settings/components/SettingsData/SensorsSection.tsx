import { Title, Group, Stack, Paper, Box, NumberInput } from '@mantine/core';
import {
  IconFoldUp,
  IconFoldDown,
  IconDropletHalf2Filled,
  IconChartBubble,
  IconTemperatureSun,
  IconReload,
} from '@tabler/icons-react';

import { useGetSettingsQuery } from 'features/db/dbApi';

export const SensorsSection = () => {
  // const [setSettings] = useSetSettingsMutation();
  const { data } = useGetSettingsQuery('0');

  if (!data) return null;

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Title order={5}>Sensors</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <Box component={IconReload} mr="md" />
          Update Interval
        </Group>
        <NumberInput
          w={50}
          value={data.updateInterval}
          defaultValue={data.updateInterval}
          // onChange={(value) =>
          //   setSettings({ arduinoId: '0', settings: { updateInterval: value } })
          // }
        />
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconTemperatureSun} mr="md" />
            Temperature
          </Group>
        </Group>
        <Stack gap="xs" ml="md" w="100%">
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldUp} mr="md" />
              Upper Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.temperature.max}
              // defaultValue={data.temperature.min}
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldDown} mr="md" />
              Lower Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.temperature.min}
              // defaultValue={data.temperature.min}
            />
          </Group>
        </Stack>
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconDropletHalf2Filled} mr="md" />
            Humidity
          </Group>
        </Group>
        <Stack gap="xs" ml="md" w="100%">
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldUp} mr="md" />
              Upper Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.humidity.max}
              // defaultValue={data.humidity.max}
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldDown} mr="md" />
              Lower Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.humidity.min}
              // defaultValue={data.humidity.min}
            />
          </Group>
        </Stack>
      </Group>

      <Group>
        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconChartBubble} mr="md" />
            CO2
          </Group>
        </Group>
        <Stack gap="xs" ml="md" w="100%">
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldUp} mr="md" />
              Upper Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.co2.max}
              // defaultValue={data.co2.max}
            />
          </Group>
          <Group justify="space-between">
            <Group gap="xs">
              <Box component={IconFoldDown} mr="md" />
              Lower Limit
            </Group>
            <NumberInput
              w={50}
              // value={data.co2.min}
              // defaultValue={data.co2.min}
            />
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};
