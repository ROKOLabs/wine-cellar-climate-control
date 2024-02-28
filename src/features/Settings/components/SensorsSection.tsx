import { Title, Group, Stack, Paper, Box } from '@mantine/core';
import {
  IconFoldUp,
  IconFoldDown,
  IconDropletHalf2Filled,
  IconChartBubble,
  IconTemperatureSun,
  IconReload,
} from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

import { CustomNumberInput } from './CustomNumberInput';

export const SensorsSection = () => {
  const { control } = useFormContext();
  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Stack>
        <Title order={5}>Sensors</Title>

        <Group justify="space-between">
          <Group gap="xs">
            <Box component={IconReload} mr="md" />
            Update Interval
          </Group>
          <CustomNumberInput name="updateInterval" control={control} />
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
              <CustomNumberInput name="temperature.max" control={control} />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <CustomNumberInput name="temperature.min" control={control} />
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
              <CustomNumberInput name="humidity.max" control={control} />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <CustomNumberInput name="humidity.min" control={control} />
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
              <CustomNumberInput name="co2.max" control={control} />
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box component={IconFoldDown} mr="md" />
                Lower Limit
              </Group>
              <CustomNumberInput name="co2.min" control={control} />
            </Group>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
};
