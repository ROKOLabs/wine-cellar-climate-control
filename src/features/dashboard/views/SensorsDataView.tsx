import { SensorData } from 'features/dashboard/components/SensorData/SensorData';
import { useGetSensorDataQuery } from 'features/db/dbApi';

export const SensorsDataView = () => {
  const { data } = useGetSensorDataQuery();
  if (!Array.isArray(data) || data.length < 1) return null;

  const dataArr = [
    {
      title: 'Temperature',
      values: data.map(({ temperature, date }) => ({
        value: temperature,
        date,
      })),
      lowerLimit: 18,
      upperLimit: 41,
      donutColor: 'indigo.6',
      displayUnit: '°',
      yMin: -20,
      yMax: 60,
      areaColor: 'orange.6',
    },
    {
      title: 'Humidity',
      values: data.map(({ humidity, date }) => ({
        value: humidity,
        date,
      })),
      lowerLimit: 20,
      upperLimit: 85,
      donutColor: 'indigo.6',
      yMin: -25,
      yMax: 100,
      areaColor: 'indigo.6',
    },
    {
      title: 'CO2',
      values: data.map(({ co2, date }) => ({
        value: co2,
        date,
      })),
      lowerLimit: 20,
      upperLimit: 40,
      donutColor: 'indigo.6',
      yMin: -10,
      yMax: 50,
      areaColor: 'cyan.6',
    },
  ];

  return dataArr.map(
    ({
      title,
      values,
      lowerLimit,
      upperLimit,
      donutColor,
      displayUnit,
      yMin,
      yMax,
      areaColor,
    }) => (
      <SensorData
        key={title}
        title={title}
        data={values}
        lowerLimit={lowerLimit}
        upperLimit={upperLimit}
        donutColor={donutColor}
        displayUnit={displayUnit}
        yMin={yMin}
        yMax={yMax}
        areaColor={areaColor}
      />
    ),
  );
};
