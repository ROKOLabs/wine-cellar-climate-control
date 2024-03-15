import { Container, Title, Group, Button } from '@mantine/core';
import { DateValue } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState } from 'react';

import { DateRangePicker } from 'features/History/components/DateRangePicker/DateRangePicker';
import { useLazyGetSensorDataRangeQuery } from 'features/db/dbApi';
import { useEventCallback } from 'hooks/useEventCallback';

export const History = () => {
  const [getData, { isLoading }] = useLazyGetSensorDataRangeQuery();

  const arduinoId = 0;

  const [from, setFrom] = useState<string>(() =>
    dayjs().subtract(1, 'month').toDate().toUTCString(),
  );
  const onChangeFrom = useEventCallback((payload: DateValue) => {
    setFrom(payload!.toUTCString());
  });

  const [to, setTo] = useState<string>(() => new Date().toUTCString());
  const onChangeTo = useEventCallback((payload: DateValue) => {
    setTo(payload!.toUTCString());
  });

  const handleGetData = () =>
    getData({ arduinoId, from, to })
      .unwrap()
      .then(console.log)
      .catch(handleError);

  const handleError = () => {
    notifications.show({
      title: 'Oops!',
      message:
        'It seems something went wrong on our end. Please try again later',
      color: 'red',
      withBorder: true,
      withCloseButton: false,
    });
  };

  return (
    <Container size="xl">
      <Title>History Page</Title>
      <Group align="flex-end" mt="xl">
        <DateRangePicker
          from={new Date(from)}
          onChangeFrom={onChangeFrom}
          to={new Date(to)}
          onChangeTo={onChangeTo}
        />
        <Button loading={isLoading} onClick={handleGetData}>
          Get sensor data
        </Button>
      </Group>
    </Container>
  );
};
