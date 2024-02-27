import { NumberInput } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

import { Settings } from 'features/db/DbService';

type RegisterableNumberInputProps = {
  name: keyof Settings | string;
};

export const RegisterableNumberInput = ({
  name,
}: RegisterableNumberInputProps) => {
  const { register } = useFormContext<Settings>();

  register(name as keyof Settings);

  return <NumberInput w={50} />;
};
