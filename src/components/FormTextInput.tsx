import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';
import { UseControllerProps, useController } from 'react-hook-form';

export type TextInputProps<T extends Record<string, unknown>> =
  UseControllerProps<T> & Omit<MantineTextInputProps, 'value' | 'defaultValue'>;

export const FormTextInput = <T extends Record<string, unknown>>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: TextInputProps<T>) => {
  const {
    field: { value, onChange: fieldOnChange },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <MantineTextInput
      value={value as number | string}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...props}
    />
  );
};
