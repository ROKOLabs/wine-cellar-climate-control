import { Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

type ChangeHandler = (value: string) => void;

type DateRangePickerProps = {
  from: string;
  to: string;
  onChangeFrom: ChangeHandler;
  onChangeTo: ChangeHandler;
};

const handleChange = (handler: ChangeHandler) => (date: Date | null) =>
  date && handler(date.toUTCString());

export const DateRangePicker = (props: DateRangePickerProps) => {
  const from = new Date(props.from);
  const to = new Date(props.to);
  const now = new Date();

  return (
    <Group>
      <DateInput
        withAsterisk
        value={from}
        label="From"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        firstDayOfWeek={0}
        maxDate={to ?? now}
        onChange={handleChange(props.onChangeFrom)}
      />
      <DateInput
        withAsterisk
        value={to}
        label="To"
        placeholder="DD/MM/YYYY"
        valueFormat="DD/MM/YYYY"
        leftSection={<IconCalendar size={18} />}
        firstDayOfWeek={0}
        minDate={from}
        maxDate={now}
        onChange={handleChange(props.onChangeTo)}
      />
    </Group>
  );
};
