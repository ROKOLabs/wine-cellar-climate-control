import { Container, Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState } from 'react';

import { DateRangePicker } from 'features/History/components/DateRangePicker/DateRangePicker';
import { Graph } from 'features/History/components/Graph/Graph';
import { useLazyGetSensorDataRangeQuery } from 'features/db/dbApi';

const handleError = () => {
  notifications.show({
    title: 'Oops!',
    message: 'It seems something went wrong on our end. Please try again later',
    color: 'red',
    withBorder: true,
    withCloseButton: false,
  });
};

// TODO: Replace with actual arduino id from the store
const arduinoId = 0;

export const History = () => {
  const [from, setFrom] = useState<string>(() => new Date().toUTCString());
  const [to, setTo] = useState<string>(() => new Date().toUTCString());

  const [getData, { isLoading, data = [] }] = useLazyGetSensorDataRangeQuery();

  const handleGetData = () =>
    getData({ arduinoId, from, to }).unwrap().catch(handleError);

  return (
    <Container size="xl">
      <Group align="flex-end" mt="xl">
        <DateRangePicker
          from={from}
          to={to}
          onChangeFrom={setFrom}
          onChangeTo={setTo}
        />
        <Button loading={isLoading} onClick={handleGetData}>
          Get sensor data
        </Button>
      </Group>
      <Graph
        data={data}
        from={dayjs(from).format('DD.MM.YYYY')}
        to={dayjs(to).format('DD.MM.YYYY')}
      />
    </Container>
  );
};
