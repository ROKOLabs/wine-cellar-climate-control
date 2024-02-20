import { Container, Stack } from '@mantine/core';

import { SettingsView } from './view/SettingsView';

export const Settings = () => {
  return (
    <Container size="xs">
      <Stack gap="xl">
        <SettingsView />
      </Stack>
    </Container>
  );
};
