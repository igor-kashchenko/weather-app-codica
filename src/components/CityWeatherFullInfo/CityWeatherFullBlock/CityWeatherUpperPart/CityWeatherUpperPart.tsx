import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  formatCoordinates,
  formatTimezone,
  parseTimeStamp,
} from '../../../../utils';

type Props = {
  dt: number;
  lat: number;
  lon: number;
  name: string;
  country: string;
  timezone: number;
};

export const CityWeatherUpperPart: React.FC<Props> = ({
  dt,
  lat,
  lon,
  name,
  country,
  timezone,
}) => {
  const time = parseTimeStamp(dt);
  const coords = formatCoordinates(lat, lon);
  const timeZoneGMT = formatTimezone(timezone);

  return (
    <Grid container flexDirection={'column'}>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={1}
      >
        <Typography variant='subtitle1'>{time}</Typography>

        <Typography variant='subtitle1'>{coords}</Typography>
      </Grid>

      <Grid container alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h4'>
          {name}, {country}
        </Typography>

        <Typography variant='subtitle1'>{timeZoneGMT}</Typography>
      </Grid>
    </Grid>
  );
};
