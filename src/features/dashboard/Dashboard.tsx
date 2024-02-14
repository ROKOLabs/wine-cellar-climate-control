import { Container, Paper, Stack } from '@mantine/core';

import { DevTools } from 'components/DevTools';
import { CO2DataDisplay } from 'features/dashboard/components/CO2DataDisplay/CO2DataDisplay';
import { HumidityDataDisplay } from 'features/dashboard/components/HumidityDataDisplay/HumidityDataDisplay';
import { TemperatureDataDisplay } from 'features/dashboard/components/TemperatureDataDisplay/TemperatureDataDisplay';
import { useRenderCount } from 'hooks/useRenderCount';

export const Dashboard = () => {
  useRenderCount('Dashboard');

  return (
    <Container size="xl">
      <Stack gap="xl">
        {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
        <Paper withBorder shadow="md" p="xl" radius="md">
          <TemperatureDataDisplay />
        </Paper>
        <Paper withBorder shadow="md" p="xl" radius="md">
          <HumidityDataDisplay />
        </Paper>
        <Paper withBorder shadow="md" p="xl" radius="md">
          <CO2DataDisplay />
        </Paper>
      </Stack>
    </Container>
  );
};
