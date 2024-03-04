import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PropsWithChildren } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { SettingsSchema } from './settingsFormValidation';

import { FormDevTools } from 'components/FormDevTools';
import { Settings } from 'features/db/DbService';
import {
  useLazyGetSettingsQuery,
  useSetSettingsMutation,
} from 'features/db/dbApi';
import { useAppSelector } from 'store/hooks';

export const SettingsFormProvider = ({ children }: PropsWithChildren) => {
  const [getSettings] = useLazyGetSettingsQuery();
  const [setSettings, { isLoading }] = useSetSettingsMutation();
  const selectedDevice = useAppSelector(
    (state) => state.settings.selectedDevice,
  );

  const form = useForm<Settings>({
    defaultValues: () => getSettings(selectedDevice).unwrap(),
    resolver: zodResolver(SettingsSchema),
  });

  const onSubmit = (settings: Settings) => {
    setSettings({ arduinoId: selectedDevice, settings })
      .unwrap()
      .then(() => {
        notifications.show({
          title: 'Congratulations!',
          message: 'Settings saved successfully!',
          color: 'green',
          withBorder: true,
          withCloseButton: false,
        });
      })
      .catch((error) => {
        notifications.show({
          title: 'Error saving settings:',
          message: error,
          color: 'red',
          withBorder: true,
          withCloseButton: false,
        });
      });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
        <Group justify="flex-end">
          <Button mt="md" type="submit" loading={isLoading}>
            Save settings
          </Button>
        </Group>
      </form>
      <FormDevTools control={form.control} />
    </FormProvider>
  );
};
