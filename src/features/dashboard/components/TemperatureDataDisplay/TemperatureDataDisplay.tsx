import { DonutChart, DonutChartCell, AreaChart } from '@mantine/charts';
import { Group, Stack, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { minBy, maxBy } from 'lodash';

import styles from './TemperatureDataDisplay.module.css';

import { useGetSensorDataQuery } from 'features/db/dbApi';

export const TemperatureDataDisplay = () => {
  const { data } = useGetSensorDataQuery();
  if (!Array.isArray(data) || data.length < 1) return;

  const MIN_TEMP = -20;
  const MAX_TEMP = 60;
  const LOWER_LIMIT = 18;
  const UPPER_LIMIT = 41;
  const UNIT = '°';

  const curVal = data[data.length - 1].temperature;
  const minVal = minBy(data, ({ temperature }) => temperature)!.temperature;
  const maxVal = maxBy(data, ({ temperature }) => temperature)!.temperature;

  let donutColor = 'indigo.6';
  if (curVal < LOWER_LIMIT || curVal > UPPER_LIMIT) {
    donutColor = 'red.6';
  }

  const donutData: DonutChartCell[] = [
    {
      name: 'Temperature',
      value: curVal,
      color: donutColor,
    },
    {
      name: 'Background',
      value: MAX_TEMP - curVal,
      color: 'gray.4',
    },
  ];

  return (
    <Group
      wrap="nowrap"
      align="flex-start"
      gap="xl"
      mt="xl"
      className={styles.wrapper}
    >
      <Stack gap="0" className={styles['donut-wrapper']}>
        <Title size="h4" className={styles['donut-title']}>
          Temperature
        </Title>
        <Group wrap="nowrap" className={styles.limits}>
          <Text size="sm" c="dimmed">
            upper: {UPPER_LIMIT}
            {UNIT}
          </Text>
          <Text size="sm" c="dimmed">
            lower: {LOWER_LIMIT}
            {UNIT}
          </Text>
        </Group>
        <DonutChart
          data={donutData}
          startAngle={90}
          endAngle={-270}
          strokeWidth={0}
          withTooltip={false}
          chartLabel={`${donutData[0].value}${UNIT}`}
          classNames={{
            root: styles.donut,
            label: styles['donut-label'],
          }}
          size={200}
          mt="xl"
        />
        <Group wrap="nowrap" mt="xl" justify="space-around">
          <Text ta="center">
            {maxVal} {UNIT}
            <br />
            Max ever
          </Text>
          <Text ta="center">
            {minVal} {UNIT}
            <br />
            Min ever
          </Text>
        </Group>
      </Stack>
      <AreaChart
        data={data}
        dataKey="date"
        series={[{ name: 'temperature', color: 'indigo.6' }]}
        xAxisProps={{
          tickFormatter: (value) => format(value, 'd.MMM HH:mm'),
        }}
        yAxisProps={{ width: 40, domain: [MIN_TEMP, MAX_TEMP] }}
        unit={UNIT}
        curveType="natural"
        withDots={false}
        connectNulls={false}
        strokeDasharray="0"
        withTooltip={false}
        fillOpacity={0.5}
        referenceLines={[
          { y: LOWER_LIMIT, label: 'Lower limit', color: 'green.6' },
          { y: UPPER_LIMIT, label: 'Upper limit', color: 'green.6' },
        ]}
        h={300}
        mt="lg"
      />
    </Group>
  );
};
