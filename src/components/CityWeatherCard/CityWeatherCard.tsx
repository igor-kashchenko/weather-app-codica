import React from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { CityWeather } from '../../types/types';
import { ICON_URL, parseTimeStamp, roundTemp } from '../../utils/utils';
import ClearIcon from '@mui/icons-material/Clear';
import {
  deleteCityWeatherCard,
  updateCityWeatherThunk,
} from '../../redux/cityWeather';
import { useAppDispatch } from '../../redux/hooks';
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from 'react-router-dom';

type Props = {
  cityCard: CityWeather;
  isCityUpdating: boolean;
  setUpdatingCity: (city: string) => void;
};

export const CityWeatherCard: React.FC<Props> = ({
  cityCard,
  isCityUpdating,
  setUpdatingCity,
}) => {
  const dispatch = useAppDispatch();

  const {
    name,
    dt,
    id,
    sys: { country },
    main: { temp, temp_min, temp_max },
    weather: [{ main, icon }],
  } = cityCard;

  const handleDeleteCityWeatherCard = () => {
    dispatch(deleteCityWeatherCard(id));
  };

  const handleUpdateCityWeather = async (city: string) => {
    try {
      setUpdatingCity(city);
      await dispatch(updateCityWeatherThunk(city));
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingCity('');
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        '&:hover': {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
        },
        position: 'relative',
        p: 2,
      }}
    >
      {isCityUpdating && (
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

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ...(isCityUpdating && {
            filter: 'blur(2px)',
            pointerEvents: 'none',
            userSelect: 'none',
          }),
          p: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Grid item>
            <Link
              to={`/cityweather/${name}`}
              style={{ textDecoration: 'none' }}
              title='Full info'
            >
              <Typography
                variant='h5'
                sx={{
                  color: '#808080',
                  transition: 'color 0.3s linear',
                  '&:hover': {
                    color: '#555',
                  },
                  '&:active': {
                    color: '#000',
                  },
                }}
              >{`${name}, ${country}`}</Typography>
            </Link>
          </Grid>

          <Grid item>
            <ClearIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#808080',
                transition: 'color 0.3s linear',
                '&:hover': {
                  color: '#555',
                },
                '&:active': {
                  color: '#000',
                },
              }}
              onClick={handleDeleteCityWeatherCard}
              titleAccess='delete city'
            />
          </Grid>
        </Grid>

        <Grid container alignItems='center'>
          <Grid item xs={4}>
            <img
              src={`${ICON_URL}/${icon}@2x.png`}
              alt='weather icon'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={4} textAlign={'center'}>
            <Typography variant='h6'>{main}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'end'}
          >
            <Typography variant='h6'>{`${roundTemp(temp)}°C`}</Typography>
            <Typography variant='subtitle2'>{`High: ${roundTemp(
              temp_max
            )}°C`}</Typography>
            <Typography variant='subtitle2'>{`Low: ${roundTemp(
              temp_min
            )}°C`}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          mt={2}
        >
          <Grid item>
            <Typography variant='subtitle1'>{parseTimeStamp(dt)}</Typography>
          </Grid>

          <Grid item>
            <ReplayIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#808080',
                transition: 'color 0.3s linear',
                '&:hover': {
                  color: '#555',
                },
                '&:active': {
                  color: '#000',
                },
              }}
              onClick={() => handleUpdateCityWeather(name)}
              titleAccess='update weather'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
