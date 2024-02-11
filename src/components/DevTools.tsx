import { Box, Button, Stack, Text } from '@mantine/core';

import { TestButton } from 'components/LoginButton';
import { DbService } from 'features/db/DbService';

const randomNum = (n: number) => Math.floor(Math.random() * n);

export const DevTools = () => {
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
  );
};
