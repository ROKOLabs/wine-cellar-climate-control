import { Button, Container, Group, Stack } from '@mantine/core';

import { ControlSection } from './components/SettingsData/ControlSection';
import { DeviceSection } from './components/SettingsData/DeviceSection';
import { SensorsSection } from './components/SettingsData/SensorsSection';
import { SettingsSection } from './components/SettingsData/SettingsSection';

import { toggleDevTools } from 'components/DevTools/provider/DevToolsSlice';
import { useAppDispatch } from 'store/hooks';

export const Settings = () => {
  const dispatch = useAppDispatch();

  const toggleDevToolsHandler = () => {
    dispatch(toggleDevTools());
  };
  return (
    <Container size="xs">
      <Stack gap="xl">
        <SettingsSection toggleDevTools={toggleDevToolsHandler} />
        <DeviceSection />
        <ControlSection />
        <SensorsSection />
      </Stack>
      <Group justify="center" style={{ marginTop: '20px' }}>
        <Button>Save</Button>
      </Group>
    </Container>
  );
};
