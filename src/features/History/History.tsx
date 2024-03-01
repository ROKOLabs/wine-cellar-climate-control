import { Button, Container, Title } from '@mantine/core';

import { DateRangePicker } from 'features/History/components/DateRangePicker/DateRangePicker';
import { useLazyGetSensorDataRangeQuery } from 'features/db/dbApi';

export const History = () => {
  const [getData, { isLoading }] = useLazyGetSensorDataRangeQuery();

  const arduinoId = 0;
  const from = new Date('2022-01-01').toUTCString();
  const to = new Date('2025-01-01').toUTCString();

  const handleGetData = () =>
    getData({ arduinoId, from, to })
      .unwrap()
      .then(console.log)
      .catch(console.error);

  return (
    <Container size="xl">
      <Title>History Page</Title>
      <Button loading={isLoading} onClick={handleGetData}>
        Get sensor data
      </Button>
      <DateRangePicker />
    </Container>
  );
};
