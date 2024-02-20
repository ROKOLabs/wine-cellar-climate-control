import {
  Paper,
  Stack,
  Divider,
  Button,
  useMantineColorScheme,
  Group,
} from '@mantine/core';
import { useState } from 'react';

import { useDevToolsToggle } from 'components/DevTools/components/hooks/useDevToolsToggle';
import { useDevToolsVisibility } from 'components/DevTools/components/hooks/useDevToolsVisibility';
import { ControlSection } from 'features/Settings/components/SettingsData/ControlSection';
import { DeviceSection } from 'features/Settings/components/SettingsData/DeviceSection';
import { SensorsSection } from 'features/Settings/components/SettingsData/SensorsSection';
import { SettingsSection } from 'features/Settings/components/SettingsData/SettingsSection';
import { useSetSettingsMutation } from 'features/db/dbApi';

export const SettingsView = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const showDevTools = useDevToolsVisibility();
  const toggleDevTools = useDevToolsToggle();
  const [selectedDevice, setSelectedDevice] = useState('Arduino1');
  const [showErrors, setShowErrors] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [updateInterval, setUpdateInterval] = useState(60);
  const [tempUpperLimit, setTempUpperLimit] = useState(41);
  const [tempLowerLimit, setTempLowerLimit] = useState(18);
  const [humidityUpperLimit, setHumidityUpperLimit] = useState(85);
  const [humidityLowerLimit, setHumidityLowerLimit] = useState(20);
  const [co2UpperLimit, setCO2UpperLimit] = useState(40);
  const [co2LowerLimit, setCO2LowerLimit] = useState(20);
  const [setSettings] = useSetSettingsMutation();
  const isDarkTheme = colorScheme === 'dark';
  const deviceOptions = [
    { value: 'Arduino1', label: 'Arduino 1' },
    { value: 'Arduino2', label: 'Arduino 2' },
  ];

  const handleDeviceChange = (value: string | null) => {
    if (value !== null) {
      setSelectedDevice(value);
    }
  };

  const handleSaveSettings = async () => {
    const settingsData = {
      arduinoId: selectedDevice,
      settings: {
        led: ledOn ? 1 : 0,
        fan: fanOn ? 1 : 0,
        updateInterval: updateInterval,
        co2: { min: co2LowerLimit, max: co2UpperLimit },
        humidity: { min: humidityLowerLimit, max: humidityUpperLimit },
        temperature: { min: tempLowerLimit, max: tempUpperLimit },
      },
    };

    try {
      await setSettings(settingsData);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Stack gap="md">
        <SettingsSection
          isDarkTheme={isDarkTheme}
          toggleColorScheme={toggleColorScheme}
          showDevTools={showDevTools}
          toggleDevTools={toggleDevTools}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />
        <Divider />
        <DeviceSection
          deviceOptions={deviceOptions}
          selectedDevice={selectedDevice}
          handleDeviceChange={handleDeviceChange}
        />
        <Divider />
        <ControlSection
          ledOn={ledOn}
          setLedOn={setLedOn}
          fanOn={fanOn}
          setFanOn={setFanOn}
          handleSaveSettings={handleSaveSettings}
          updateInterval={updateInterval}
          setUpdateInterval={setUpdateInterval}
        />
        <Divider />
        <SensorsSection
          updateInterval={updateInterval}
          setUpdateInterval={setUpdateInterval}
          tempUpperLimit={tempUpperLimit}
          setTempUpperLimit={setTempUpperLimit}
          tempLowerLimit={tempLowerLimit}
          setTempLowerLimit={setTempLowerLimit}
          humidityUpperLimit={humidityUpperLimit}
          setHumidityUpperLimit={setHumidityUpperLimit}
          humidityLowerLimit={humidityLowerLimit}
          setHumidityLowerLimit={setHumidityLowerLimit}
          co2UpperLimit={co2UpperLimit}
          setCO2UpperLimit={setCO2UpperLimit}
          co2LowerLimit={co2LowerLimit}
          setCO2LowerLimit={setCO2LowerLimit}
        />
        <Divider />
        <Group justify="center" style={{ marginTop: '20px' }}>
          <Button onClick={handleSaveSettings}>Save</Button>
        </Group>
      </Stack>
    </Paper>
  );
};
