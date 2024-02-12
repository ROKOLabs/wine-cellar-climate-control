import { Stack, Title } from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

import { DevTools } from 'components/DevTools';
import { useAuth } from 'features/auth/hooks/useAuth';
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
    <Stack>
      <Title>Dashboard Page</Title>
      <DevTools />
      <TemperatureDataDisplay />
    </Stack>
  );
};
