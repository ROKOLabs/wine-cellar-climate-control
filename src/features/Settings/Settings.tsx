import { Container, Stack } from '@mantine/core';

import { ControlSection } from './components/ControlSection';
import { DeviceSection } from './components/DeviceSection';
import { SensorsSection } from './components/SensorsSection';
import { SettingsSection } from './components/SettingsSection';

import { SettingsFormProvider } from 'features/Settings/SettingsFormProvider';

export const Settings = () => {
  return (
    <Container size="xs" pos="relative">
      <SettingsFormProvider>
        <Stack>
          <SettingsSection />
          <DeviceSection />
          <ControlSection />
          <SensorsSection />
        </Stack>
      </SettingsFormProvider>
    </Container>
  );
};
