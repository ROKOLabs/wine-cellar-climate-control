import { Title, Group, Switch, Paper, Box } from '@mantine/core';
import { IconBulb, IconPropeller } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

import { Settings } from 'features/db/DbService';

export const ControlSection = () => {
  const { register } = useFormContext<Settings>();

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Title order={5}>Control</Title>

      <Group justify="space-between">
        <Group gap="xs">
          <Box component={IconBulb} mr="md" />
          LED switch
        </Group>
        <Switch {...register('led')} />
      </Group>

      <Group justify="space-between">
        <Group gap="xs">
          <Box component={IconPropeller} mr="md" />
          Fan switch
        </Group>
        <Switch {...register('fan')} />
      </Group>
    </Paper>
  );
};
