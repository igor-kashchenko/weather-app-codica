import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ICON_URL, roundTemp } from '../../../../utils';

type Props = {
  icon: string;
  main: string;
  description: string;
  temp: number;
  feels_like: number;
  temp_max: number;
  temp_min: number;
};

export const CityWeatherMiddlePart: React.FC<Props> = ({
  icon,
  main,
  description,
  temp,
  feels_like,
  temp_max,
  temp_min,
}) => {
  const roundedTemp = roundTemp(temp);
  const roundedFeelsLikeTemp = roundTemp(feels_like);
  const roundedMaxTemp = roundTemp(temp_max);
  const roundedMinTemp = roundTemp(temp_min);

  return (
    <Paper sx={{ p: 2, mt: 1 }} elevation={3}>
      <Grid container>
        <Grid item xs={4} p={2}>
          <img
            src={`${ICON_URL}/${icon}@4x.png`}
            alt='weather icon'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Grid>

        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          xs={4}
          p={2}
        >
          <Typography variant='h4'>{main}</Typography>
          <Typography variant='body1'>{description}</Typography>
          <Typography variant='h4'>{`${roundedTemp}°C`}</Typography>
        </Grid>

        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          xs={4}
          p={2}
        >
          <Typography variant='body1'>{`Feels like: ${roundedFeelsLikeTemp}°C`}</Typography>
          <Typography variant='body1'>{`High: ${roundedMaxTemp}°C`}</Typography>
          <Typography variant='body1'>{`Low: ${roundedMinTemp}°C`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
