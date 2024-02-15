import { Container, Title } from '@mantine/core';

import { useGetSettingsQuery } from 'features/db/dbApi';

const ARDUINO_ID = '1';

export const Settings = () => {
  const { data } = useGetSettingsQuery(ARDUINO_ID);

  return (
    <Container size="xl">
      <Title>Settings Page</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Container>
  );
};
