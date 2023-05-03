import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WavesOutlinedIcon from '@mui/icons-material/WavesOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import {
  formatWindDirection,
  getWindDirectionIcon,
  parseTimeStamp,
} from '../../../../utils';

type Props = {
  deg: number;
  speed: number;
  pressure: number;
  humidity: number;
  rain1h?: number;
  all: number;
  visibility: number;
  sea_level?: number;
  grnd_level?: number;
  sunrise: number;
  sunset: number;
};

export const CityWeatherBottomPart: React.FC<Props> = ({
  deg,
  speed,
  pressure,
  humidity,
  rain1h,
  all,
  visibility,
  sea_level,
  grnd_level,
  sunrise,
  sunset,
}) => {
  const windDirection = formatWindDirection(deg);
  const windDirectionIcon = getWindDirectionIcon(windDirection);
  const sunriseTime = parseTimeStamp(sunrise, 'sun');
  const sunsetTime = parseTimeStamp(sunset, 'sun');

  return (
    <Box borderLeft={'2px solid #000'} sx={{ mt: 3, pl: 2 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
          <Grid container mb={1}>
            <AirIcon sx={{ mr: 1 }} titleAccess={`Wind ${windDirection}`} />

            <Typography variant='body1'>{`${speed}m/s`}</Typography>

            {windDirectionIcon}
          </Grid>

          <Grid container mb={1}>
            <CompressIcon sx={{ mr: 1 }} titleAccess='Pressure' />

            <Typography variant='body1'>{`${pressure} hPa`}</Typography>
          </Grid>

          <Grid container mb={1}>
            <WaterDropIcon sx={{ mr: 1 }} titleAccess='Humidity' />

            <Typography variant='body1'>{`${humidity}%`}</Typography>
          </Grid>

          {rain1h && (
            <Grid container>
              <BeachAccessOutlinedIcon
                sx={{ mr: 1 }}
                titleAccess='Rain volume for the last 1 hour'
              />

              <Typography variant='body1'>{`${rain1h}mm`}</Typography>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4}>
          <Grid container mb={1} alignItems={'center'}>
            <CloudOutlinedIcon sx={{ mr: 1 }} titleAccess='Cloudiness' />

            <Typography variant='body1'>{`${all}%`}</Typography>
          </Grid>

          <Grid container mb={1} alignItems={'center'}>
            <VisibilityOutlinedIcon sx={{ mr: 1 }} titleAccess='Visibility' />

            <Typography variant='body1'>{`${visibility}m`}</Typography>
          </Grid>

          {sea_level && (
            <Grid container mb={1} alignItems={'center'}>
              <WavesOutlinedIcon sx={{ mr: 1 }} titleAccess='Sea level' />

              <Typography variant='body1'>{`${sea_level}m`}</Typography>
            </Grid>
          )}

          {grnd_level && (
            <Grid container alignItems={'center'}>
              <LandscapeOutlinedIcon
                sx={{ mr: 1 }}
                titleAccess='Ground level'
              />

              <Typography variant='body1'>{`${grnd_level}m`}</Typography>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4}>
          <Grid container alignItems={'center'} mb={1}>
            <WbTwilightIcon sx={{ mr: 1 }} titleAccess='Sunrise' />

            <Typography variant='body1'>{`${sunriseTime}`}</Typography>
          </Grid>

          <Grid container alignItems={'center'}>
            <Brightness4OutlinedIcon sx={{ mr: 1 }} titleAccess='Sunset' />

            <Typography variant='body1'>{`${sunsetTime}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
