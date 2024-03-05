import { Button, Container, Title } from '@mantine/core';
import { DateValue } from '@mantine/dates';
import { useCallback, useState } from 'react';

import { DateRangePicker } from 'features/History/components/DateRangePicker/DateRangePicker';
import { useLazyGetSensorDataRangeQuery } from 'features/db/dbApi';

export const History = () => {
  const [getData, { isLoading }] = useLazyGetSensorDataRangeQuery();

  const arduinoId = 0;

  const [from, setFrom] = useState<string>(
    new Date('2022-01-01').toUTCString(),
  );
  const onChangeFrom = useCallback((payload: DateValue) => {
    setFrom(payload!.toUTCString());
  }, []);

  const [to, setTo] = useState<string>(new Date().toUTCString());
  const onChangeTo = useCallback((payload: DateValue) => {
    setTo(payload!.toUTCString());
  }, []);

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
      <DateRangePicker
        from={new Date(from)}
        onChangeFrom={onChangeFrom}
        to={new Date(to)}
        onChangeTo={onChangeTo}
      />
    </Container>
  );
};
