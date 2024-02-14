import { DonutChart, DonutChartCell, AreaChart } from '@mantine/charts';
import { Group, Stack, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { minBy, maxBy } from 'lodash';

import styles from './CO2DataDisplay.module.css';

import { useGetSensorDataQuery } from 'features/db/dbApi';

export const CO2DataDisplay = () => {
  const { data } = useGetSensorDataQuery();
  if (!Array.isArray(data) || data.length < 1) return;

  const MIN_CO2 = -10;
  const MAX_CO2 = 50;
  const LOWER_LIMIT = 20;
  const UPPER_LIMIT = 40;

  const curVal = data[data.length - 1].co2;
  const minVal = minBy(data, ({ co2 }) => co2)!.co2;
  const maxVal = maxBy(data, ({ co2 }) => co2)!.co2;

  let donutColor = 'indigo.6';
  if (curVal < LOWER_LIMIT || curVal > UPPER_LIMIT) {
    donutColor = 'red.6';
  }

  const donutData: DonutChartCell[] = [
    {
      name: 'CO2',
      value: curVal,
      color: donutColor,
    },
    {
      name: 'Background',
      value: MAX_CO2 - curVal,
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
          CO2
        </Title>
        <Group wrap="nowrap" className={styles.limits}>
          <Text size="sm" c="dimmed">
            upper: {UPPER_LIMIT}
          </Text>
          <Text size="sm" c="dimmed">
            lower: {LOWER_LIMIT}
          </Text>
        </Group>
        <DonutChart
          data={donutData}
          startAngle={90}
          endAngle={-270}
          strokeWidth={0}
          withTooltip={false}
          chartLabel={`${donutData[0].value}`}
          classNames={{
            root: styles.donut,
            label: styles['donut-label'],
          }}
          size={200}
          mt="xl"
        />
        <Group wrap="nowrap" mt="xl" justify="space-around">
          <Text ta="center">
            {maxVal}
            <br />
            Max ever
          </Text>
          <Text ta="center">
            {minVal}
            <br />
            Min ever
          </Text>
        </Group>
      </Stack>
      <AreaChart
        data={data}
        dataKey="date"
        series={[{ name: 'co2', color: 'indigo.6' }]}
        xAxisProps={{
          tickFormatter: (value) => format(value, 'd.MMM HH:mm'),
        }}
        yAxisProps={{ width: 40, domain: [MIN_CO2, MAX_CO2] }}
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
