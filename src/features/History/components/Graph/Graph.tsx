import { LineChart } from '@mantine/charts';
import { Paper, Title, Text } from '@mantine/core';
import dayjs from 'dayjs';

import { GetSensorDataRangeResponse } from 'features/db/DbService';

type Props = {
  data: GetSensorDataRangeResponse;
  from: string;
  to: string;
};

export const Graph = ({ data, from, to }: Props) => {
  return (
    <Paper withBorder shadow="md" mt="xl" p="xl" radius="md">
      <Title ta="center" size="h4">
        History chart
      </Title>
      <Text ta="center" mt="xs" size="sm" c="dimmed">
        From {from} to {to}
      </Text>
      <LineChart
        mt="xl"
        h={300}
        data={data}
        dataKey="date"
        series={[
          { name: 'temperature', label: 'Temperature', color: 'orange.6' },
          { name: 'humidity', label: 'Humidity', color: 'blue.6' },
          { name: 'co2', label: 'CO2', color: 'cyan.6' },
        ]}
        xAxisProps={{
          tickFormatter: (value) => dayjs(value).format('D.MMM HH:mm'),
        }}
        yAxisProps={{ width: 40, domain: [-20, 120] }}
        withLegend
        legendProps={{ verticalAlign: 'bottom' }}
        curveType="natural"
        tickLine="none"
        withDots={false}
        strokeDasharray="0"
        tooltipAnimationDuration={200}
      />
    </Paper>
  );
};
