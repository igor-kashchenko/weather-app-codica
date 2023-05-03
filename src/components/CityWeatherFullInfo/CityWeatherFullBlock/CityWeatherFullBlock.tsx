import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { CityWeather, Status } from '../../../types';
import { CityWeatherUpperPart } from './CityWeatherUpperPart';
import { CityWeatherMiddlePart } from './CityWeatherMiddlePart';
import { CityWeatherBottomPart } from './CityWeatherBottomPart';
import { useAppSelector } from '../../../redux/hooks';

type Props = {
  cityWeather: CityWeather;
};

export const CityWeatherFullBlock: React.FC<Props> = ({ cityWeather }) => {
  const status = useAppSelector((state) => state.cityWeather.updateStatus);
  const isUpdating = status === Status.Loading;

  const {
    coord: { lon, lat },
    weather: [{ main, description, icon }],
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      sea_level,
      grnd_level,
    },
    visibility,
    wind: { speed, deg },
    rain: { '1h': rain1h } = {},
    clouds: { all },
    dt,
    sys: { country, sunrise, sunset },
    timezone,
    name,
  } = cityWeather;

  if (!cityWeather) {
    return (
      <Typography variant='h4'>
        City not found. Something went wrong.
      </Typography>
    );
  }

  return (
    <Grid
      item
      md={6}
      xs={12}
      position={'relative'}
      sx={{
        ...(isUpdating && {
          filter: 'blur(2px)',
          pointerEvents: 'none',
          userSelect: 'none',
        }),
      }}
    >
      {isUpdating && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <CircularProgress size={32} color='inherit' />
        </div>
      )}

      <Paper sx={{ p: 2, height: '93%' }} elevation={10}>
        <CityWeatherUpperPart
          dt={dt}
          timezone={timezone}
          country={country}
          name={name}
          lon={lon}
          lat={lat}
        />

        <CityWeatherMiddlePart
          main={main}
          description={description}
          temp={temp}
          feels_like={feels_like}
          temp_max={temp_max}
          temp_min={temp_min}
          icon={icon}
        />

        <CityWeatherBottomPart
          pressure={pressure}
          sunset={sunset}
          sunrise={sunrise}
          all={all}
          visibility={visibility}
          rain1h={rain1h}
          speed={speed}
          deg={deg}
          sea_level={sea_level}
          grnd_level={grnd_level}
          humidity={humidity}
        />
      </Paper>
    </Grid>
  );
};
