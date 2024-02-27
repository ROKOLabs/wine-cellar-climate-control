import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { SettingsSchema } from './config';

import { FormDevTools } from 'components/FormDevTools';
import { Settings } from 'features/db/DbService';
import {
  useLazyGetSettingsQuery,
  useSetSettingsMutation,
} from 'features/db/dbApi';

// TODO: Implement setting slice if needed changing arduinoId in the future
const ARDUINO_ID = '1';

export const SettingsFormProvider = ({ children }: PropsWithChildren) => {
  const [getSettings] = useLazyGetSettingsQuery();
  const [setSettings, { isLoading }] = useSetSettingsMutation();

  const form = useForm<Settings>({
    defaultValues: () => getSettings(ARDUINO_ID).unwrap(),
    resolver: zodResolver(SettingsSchema),
  });

  const onSubmit = (settings: Settings) => {
    setSettings({ arduinoId: ARDUINO_ID, settings })
      .unwrap()
      .then(() => {
        console.log('Settings saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
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
