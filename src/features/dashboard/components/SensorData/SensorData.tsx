import { DonutChart, DonutChartCell, AreaChart } from '@mantine/charts';
import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import maxBy from 'lodash/fp/maxBy';
import minBy from 'lodash/fp/minBy';

import styles from './SensorData.module.css';

type Props = {
  title: string;
  data: { value: number; date: number }[];
  lowerLimit: number;
  upperLimit: number;
  donutColor: string;
  displayUnit?: string;
  yMin: number;
  yMax: number;
  areaColor: string;
};

export const SensorData = ({
  title,
  data,
  lowerLimit,
  upperLimit,
  donutColor,
  displayUnit,
  yMin,
  yMax,
  areaColor,
}: Props) => {
  const curVal = data[data.length - 1].value;

  if (curVal < lowerLimit || curVal > upperLimit) {
    donutColor = 'red.6';
  }

  const donutData: DonutChartCell[] = [
    {
      name: title,
      value: curVal,
      color: donutColor,
    },
    {
      name: 'Background',
      value: yMax - curVal,
      color: 'gray.4',
    },
  ];

  const minVal = minBy('value', data)!.value;
  const maxVal = maxBy('value', data)!.value;

  return (
    <Paper withBorder shadow="md" p="xl" radius="md">
      <Group
        wrap="nowrap"
        align="flex-start"
        gap="xl"
        className={styles.wrapper}
      >
        <Stack gap="0" className={styles['donut-wrapper']}>
          <Title size="h4" className={styles['donut-title']}>
            {title}
          </Title>
          <Group wrap="nowrap" className={styles.limits}>
            <Text size="sm" c="dimmed">
              upper: {upperLimit}
              {displayUnit}
            </Text>
            <Text size="sm" c="dimmed">
              lower: {lowerLimit}
              {displayUnit}
            </Text>
          </Group>
          <DonutChart
            data={donutData}
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
            withTooltip={false}
            chartLabel={`${donutData[0].value}${displayUnit || ''}`}
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
              {displayUnit}
              <br />
              Max ever
            </Text>
            <Text ta="center">
              {minVal}
              {displayUnit}
              <br />
              Min ever
            </Text>
          </Group>
        </Stack>
        <AreaChart
          data={data}
          dataKey="date"
          series={[{ name: 'value', color: areaColor }]}
          xAxisProps={{
            tickFormatter: (value) => dayjs(value).format('D.MMM HH:mm'),
          }}
          yAxisProps={{ width: 40, domain: [yMin, yMax] }}
          unit={displayUnit}
          curveType="natural"
          withDots={false}
          connectNulls={false}
          strokeDasharray="0"
          withTooltip={false}
          fillOpacity={0.5}
          referenceLines={[
            { y: lowerLimit, label: 'Lower limit', color: 'green.6' },
            { y: upperLimit, label: 'Upper limit', color: 'green.6' },
          ]}
          h={300}
          mt="lg"
        />
      </Group>
    </Paper>
  );
};
