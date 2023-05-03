import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { CityWeatherCard } from '../CityWeatherCard/CityWeatherCard';
import { useAppSelector } from '../../redux/hooks';

export const CityWeatherCardsList: React.FC = () => {
  const cityCards = useAppSelector(
    (state) => state.cityWeather.cityWeatherData
  );
  const [updatingCity, setUpdatingCity] = useState('');

  return (
    <Grid container spacing={2} mt={2}>
      {cityCards.map((cityCard) => {
        const isCityUpdating = updatingCity === cityCard.name;
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cityCard.id}>
            <CityWeatherCard
              cityCard={cityCard}
              isCityUpdating={isCityUpdating}
              setUpdatingCity={setUpdatingCity}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
