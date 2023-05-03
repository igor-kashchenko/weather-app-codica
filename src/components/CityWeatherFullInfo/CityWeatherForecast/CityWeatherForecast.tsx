import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchCityWeatherForecast } from '../../../redux/cityWeather';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Status } from '../../../types';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

type Props = {
  city: string;
};

export const CityWeatherForecast: React.FC<Props> = ({ city }) => {
  const dispatch = useAppDispatch();
  const cityWeatherForecast = useAppSelector(
    (state) => state.cityWeather.cityWeatherForecastData
  );
  const findCityForecast = cityWeatherForecast.find(
    (cityData) => cityData.address === city
  );
  const hoursData = findCityForecast?.hoursData || [];
  const minTemp = Math.min(...hoursData.map((hour) => hour.temp));
  const maxTemp = Math.max(...hoursData.map((hour) => hour.temp));

  const status = useAppSelector((state) => state.cityWeather.forecastStatus);
  const isLoading = status === Status.Loading;

  const error = useAppSelector((state) => state.cityWeather.forecastStatus);
  const isError = error === Status.Failed;

  useEffect(() => {
    if (!findCityForecast) {
      dispatch(fetchCityWeatherForecast(city));
    }
  }, []);

  const data = {
    labels: hoursData.map((hour) => hour.datetime),
    datasets: [
      {
        label: 'Temperature',
        data: hoursData.map((hour) => hour.temp),
        backgroundColor: '#eb6e4b',
        borderColor: 'black',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            let label = tooltipItem.dataset.label || '';
            if (label) {
              label += ' ';
            }
            if (tooltipItem.parsed.y !== null) {
              label += tooltipItem.parsed.y + '°C';
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        min: minTemp - 2,
        max: maxTemp + 2,
        ticks: {
          stepSize: 1,
          callback: function (tickValue: number | string) {
            return tickValue + '°C';
          },
        },
      },
    },
  };

  return (
    <Grid item md={6} xs={12}>
      <Paper sx={{ p: 2, height: '93%' }} elevation={10}>
        {isLoading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '93%' }}
          >
            <CircularProgress />
          </Grid>
        ) : isError ? (
          <Typography variant="body1" color="error">
            Error occurred while fetching data.
          </Typography>
        ) : (
          <Line data={data} options={options} />
        )}
      </Paper>
    </Grid>
  );
};
