import { Container, Paper, Stack } from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

import { DevTools } from 'components/DevTools';
import { useAuth } from 'features/auth/hooks/useAuth';
import { CO2DataDisplay } from 'features/dashboard/components/CO2DataDisplay/CO2DataDisplay';
import { HumidityDataDisplay } from 'features/dashboard/components/HumidityDataDisplay/HumidityDataDisplay';
import { TemperatureDataDisplay } from 'features/dashboard/components/TemperatureDataDisplay/TemperatureDataDisplay';
import {
  useGetSensorDataQuery,
  useGetUserDetailsQuery,
} from 'features/db/dbApi';

export const Dashboard = () => {
  const { currentUserUid: userUid } = useAuth();
  const { data: sensorData } = useGetSensorDataQuery();
  const { data: userDetails } = useGetUserDetailsQuery(userUid ?? skipToken);

  useEffect(() => {
    console.log(sensorData);
  }, [sensorData]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

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
