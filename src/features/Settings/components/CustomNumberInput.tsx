import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';
import { useController, UseControllerProps } from 'react-hook-form';

export type NumberInputProps<T extends Record<string, unknown>> =
  UseControllerProps<T> &
    Omit<MantineNumberInputProps, 'value' | 'defaultValue'>;

export const CustomNumberInput = <T extends Record<string, unknown>>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NumberInputProps<T>) => {
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
    <>
      <MantineNumberInput
        w={100}
        value={value as number | string}
        onChange={(e) => {
          fieldOnChange(e);
          onChange?.(e);
        }}
        error={fieldState.error?.message}
        {...props}
      />
    </>
  );
};
