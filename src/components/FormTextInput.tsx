import { TextInput } from '@mantine/core';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type FormTextInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  withAsterisk?: boolean;
};

export const FormTextInput = <T extends FieldValues>({
  name,
  label,
  control,
  withAsterisk = false,
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextInput
          {...field}
          label={label}
          withAsterisk={withAsterisk}
          error={error?.message}
        />
      )}
    />
  );
};
