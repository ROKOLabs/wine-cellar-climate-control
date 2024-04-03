import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group } from '@mantine/core';
import { PropsWithChildren, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { SettingsSchema } from './settingsFormValidation';
import { selectSelectedDevice } from './settingsSlice';

import { FormDevTools } from 'components/FormDevTools';
import { Settings } from 'features/db/DbService';
import {
  useLazyGetSettingsQuery,
  useSetSettingsMutation,
} from 'features/db/dbApi';
import { useAppSelector } from 'store/hooks';
import {
  errorNotificationCurried,
  successNotificationCurried,
} from 'utility/notificationUtils';

export const SettingsFormProvider = ({ children }: PropsWithChildren) => {
  const [getSettings] = useLazyGetSettingsQuery();
  const [setSettings, { isLoading }] = useSetSettingsMutation();
  const selectedDevice = useAppSelector(selectSelectedDevice);

  const form = useForm<Settings>({
    defaultValues: () => getSettings(selectedDevice).unwrap(),
    resolver: zodResolver(SettingsSchema),
  });

  useEffect(() => {
    getSettings(selectedDevice).unwrap().then(form.reset);
  }, [selectedDevice, getSettings, form.reset]);

  const onSubmit = (settings: Settings) => {
    setSettings({ arduinoId: selectedDevice, settings })
      .unwrap()
      .then(
        successNotificationCurried({
          title: 'Settings saved',
          message: 'Settings saved successfully!',
        }),
      )
      .catch(
        errorNotificationCurried({
          title: 'Settings save error',
          message:
            'It seems something went wrong on our end. Please try again later',
        }),
      );
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
