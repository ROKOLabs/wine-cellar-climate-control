import { TextInput } from '@mantine/core';
import { Control, Controller } from 'react-hook-form';

import { ForgotPasswordFormData } from 'features/auth/pages/forgotPassword/ForgotPasswordForm';

type FormTextInputProps = {
  name: keyof ForgotPasswordFormData;
  label: string;
  control: Control<ForgotPasswordFormData>;
  error?: string;
  withAsterisk?: boolean;
};

export const FormTextInput = ({
  name,
  label,
  control,
  error,
  withAsterisk = false,
}: FormTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          label={label}
          withAsterisk={withAsterisk}
          error={error}
        />
      )}
    />
  );
};
