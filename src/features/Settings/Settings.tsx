import { Container, Stack } from '@mantine/core';

import { ControlSection } from './components/SettingsData/ControlSection';
import { DeviceSection } from './components/SettingsData/DeviceSection';
import { SensorsSection } from './components/SettingsData/SensorsSection';
import { SettingsSection } from './components/SettingsData/SettingsSection';

import { toggleDevTools } from 'components/DevTools/provider/DevToolsSlice';
import { SettingsFormProvider } from 'features/Settings/SettingsFormProvider';
import { useAppDispatch } from 'store/hooks';

export const Settings = () => {
  const dispatch = useAppDispatch();

  const toggleDevToolsHandler = () => {
    dispatch(toggleDevTools());
  };

  return (
    <Container size="xs" pos="relative">
      <SettingsFormProvider>
        <Stack>
          <SettingsSection toggleDevTools={toggleDevToolsHandler} />
          <DeviceSection />
          <ControlSection />
          <SensorsSection />
        </Stack>
      </SettingsFormProvider>
    </Container>
  );
};
