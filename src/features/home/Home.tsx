import { Box, Button, Stack, Text } from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

import { TestButton } from 'components/LoginButton';
import { useAuthService } from 'features/auth/hooks/useAuthService';
import { DbService } from 'features/db/DbService';
import {
  useGetSensorDataQuery,
  useGetUserDetailsQuery,
} from 'features/db/dbApi';

const randomNum = (n: number) => Math.floor(Math.random() * n);

export const Home = () => {
  const { userUid } = useAuthService();
  const { data: sensorData } = useGetSensorDataQuery();
  const { data: userDetails } = useGetUserDetailsQuery(userUid ?? skipToken);

  useEffect(() => {
    console.log(sensorData);
  }, [sensorData]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const addData = () =>
    DbService.getInstance()
      .addSensorData({
        arduino: 0,
        co2: randomNum(20),
        date: new Date(),
        humidity: randomNum(100),
        temperature: randomNum(50),
      })
      .then(console.log)
      .catch(console.error);

  return (
    <div>
      <h1>Home Page</h1>
      <Box
        p="md"
        w="fit-content"
        style={{ border: 'solid 1px red', borderRadius: 8 }}
      >
        <Stack align="flex-start">
          <Text>Test Buttons</Text>
          <TestButton />
          <Button onClick={addData}>Add Sensor Data</Button>
        </Stack>
      </Box>
    </div>
  );
};
