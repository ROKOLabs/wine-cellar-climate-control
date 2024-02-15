import { Container, Stack } from '@mantine/core';

import { SensorsDataView } from 'features/dashboard/views/SensorsDataView';

export const Dashboard = () => {
  return (
    <Container size="xl">
      <Stack gap="xl">
        <SensorsDataView />
      </Stack>
    </Container>
  );
};
