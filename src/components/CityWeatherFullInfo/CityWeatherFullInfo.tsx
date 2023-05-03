import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CityWeatherFullBlock } from './CityWeatherFullBlock';
import { CityWeatherForecast } from './CityWeatherForecast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { CityWeather } from '../../types';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateCityWeatherThunk } from '../../redux/cityWeather';

export const CityWeatherFullInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const cityWeatherData = useAppSelector(
    (state) => state.cityWeather.cityWeatherData
  );
  const { cityName = '' } = useParams();
  const cityWeather = cityWeatherData.find(
    (city) => city.name === cityName
  ) as CityWeather;

  const navigate = useNavigate();

  const handleNavigateHome = () => navigate('/');

  const handleUpdateCityWeather = async (city: string) => {
    try {
      await dispatch(updateCityWeatherThunk(city));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h2' textAlign={'center'}>
          Weather Forecast
        </Typography>
      </Grid>

      <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
        <ArrowBackIcon
          sx={{
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
          titleAccess='go back'
          onClick={handleNavigateHome}
        />

        <ReplayIcon
          sx={{
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
          titleAccess='update data'
          onClick={() => handleUpdateCityWeather(cityName)}
        />
      </Grid>

      <CityWeatherFullBlock cityWeather={cityWeather} />

      <CityWeatherForecast city={cityName} />
    </Grid>
  );
};
