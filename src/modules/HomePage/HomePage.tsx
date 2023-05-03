import React from 'react';
import { Typography } from '@mui/material';
import { CityWeatherCardsList } from '../../components/CityWeatherCardsList';
import { CityAddForm } from '../../components/CityAddForm';

export const HomePage: React.FC = () => (
  <>
    <Typography variant='h2' textAlign={'center'}>
      Weather App
    </Typography>

    <CityAddForm />

    <CityWeatherCardsList />
  </>
);
