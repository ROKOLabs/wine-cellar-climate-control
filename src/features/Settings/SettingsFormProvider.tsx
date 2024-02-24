import { Button, Group } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

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
    // TODO: Add Zod validation schema for settings
  });

  const onSubmit = (settings: Settings) =>
    setSettings({ arduinoId: ARDUINO_ID, settings })
      .unwrap()
      // TODO: Handle error (show toast or smth. else)
      .catch(console.error);

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
