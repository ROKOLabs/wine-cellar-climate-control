import { Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';

export const DateRangePicker = () => {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  return (
    <Group mt="xl">
      <DateInput
        value={from}
        onChange={setFrom}
        label="From"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        withAsterisk
        firstDayOfWeek={0}
        maxDate={to || new Date()}
        clearable
      />
      <DateInput
        value={to}
        onChange={setTo}
        label="To"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        withAsterisk
        firstDayOfWeek={0}
        minDate={from ?? undefined}
        maxDate={new Date()}
        clearable
      />
    </Group>
  );
};
