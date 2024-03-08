import { Group } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

type Props = {
  from: Date;
  onChangeFrom: (date: DateValue) => void;
  to: Date;
  onChangeTo: (date: DateValue) => void;
};

export const DateRangePicker = ({
  from,
  onChangeFrom,
  to,
  onChangeTo,
}: Props) => {
  return (
    <Group mt="xl">
      <DateInput
        value={from}
        onChange={onChangeFrom}
        label="From"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        withAsterisk
        firstDayOfWeek={0}
        maxDate={to || new Date()}
      />
      <DateInput
        value={to}
        onChange={onChangeTo}
        label="To"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        withAsterisk
        firstDayOfWeek={0}
        minDate={from}
        maxDate={new Date()}
      />
    </Group>
  );
};
