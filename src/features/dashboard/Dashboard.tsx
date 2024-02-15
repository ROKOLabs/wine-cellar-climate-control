import { Container, Stack } from '@mantine/core';

import { DevTools } from 'components/DevTools';
import { useRenderCount } from 'hooks/useRenderCount';

export const Dashboard = () => {
  useRenderCount('Dashboard');

  return (
    <Container size="xl">
      <Stack gap="xl">
        {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
      </Stack>
    </Container>
  );
};
