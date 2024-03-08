import { DevTool } from '@hookform/devtools';
import { createPortal } from 'react-dom';
import { Control, FieldValues } from 'react-hook-form';

type FormDevToolsProps<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any>;
};

export const FormDevTools = <T extends FieldValues>({
  control,
}: FormDevToolsProps<T>) => {
  if (process.env.NODE_ENV === 'production') return null;
  return createPortal(
    <DevTool control={control} placement="bottom-right" />,
    document.body,
  );
};
