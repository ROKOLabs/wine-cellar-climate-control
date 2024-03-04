import { Title, Group, Stack, Paper, Box } from '@mantine/core';
import {
  IconFoldUp,
  IconFoldDown,
  IconDropletHalf2Filled,
  IconChartBubble,
  IconTemperatureSun,
  IconReload,
} from '@tabler/icons-react';

import { FormNumberInput } from 'components/FormNumberInput';

export const SensorsSection = () => {
  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Stack>
        <Title order={5}>Sensors</Title>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconReload} mr="md" />
            Update Interval
          </Group>
          <FormNumberInput name="updateInterval" />
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
              <FormNumberInput name="temperature.max" />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <FormNumberInput name="temperature.min" />
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
              <FormNumberInput name="humidity.max" />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <FormNumberInput name="humidity.min" />
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
              <FormNumberInput name="co2.max" />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <FormNumberInput name="co2.min" />
            </Group>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
};
