import React, { useEffect } from 'react';
import '@mui/material';
import { AppContainer } from './components/AppContainer/AppContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/PageNotFound';
import { CityWeatherPage } from './modules/CityWeatherPage';
import { AlertComponent } from './components/AlertComponent';
import { InfoComponent } from './components/InfoComponent';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { updateCityWeatherThunk } from './redux/cityWeather';
import { fetch24hoursForecast } from './utils';

export const App: React.FC = () => {
  const weatherCards = useAppSelector(
    (state) => state.cityWeather.cityWeatherData
  );
  const weatherForecasts = useAppSelector(
    (state) => state.cityWeather.cityWeatherForecastData
  );
  const dispatch = useAppDispatch();

  const updateWeatherData = async () => {
    const promises = weatherCards.map((cityCard) =>
      dispatch(updateCityWeatherThunk(cityCard.name))
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error('Error updating weather data:', error);
    }
  };

  const updateForecastData = async () => {
    const currentDate = new Date();

    const promises = weatherForecasts.map(async (forecast) => {
      const forecastDate = new Date(forecast.datetimeEpoch * 1000);

      if (
        forecastDate.getDate() !== currentDate.getDate() ||
        forecastDate.getMonth() !== currentDate.getMonth() ||
        forecastDate.getFullYear() !== currentDate.getFullYear()
      ) {
        try {
          const newForecastData = await fetch24hoursForecast(forecast.address);
          if (newForecastData) {
            return { ...forecast, ...newForecastData };
          }
        } catch (error) {
          console.error(
            'Error updating forecast data for:',
            forecast.address,
            error
          );
        }
      }
      return forecast;
    });

    try {
      const results = await Promise.allSettled(promises);
      const updatedForecastData = results
        .map((result) => (result.status === 'fulfilled' ? result.value : null))
        .filter((item) => item !== null);

      localStorage.setItem(
        'cityWeatherForecastData',
        JSON.stringify(updatedForecastData)
      );
    } catch (error) {
      console.error('Error updating forecast data:', error);
    }
  };

  useEffect(() => {
    updateWeatherData();
    updateForecastData();
  }, []);

  return (
    <AppContainer>
      <Routes>
        <Route path='*' element={<PageNotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route path='cityweather/:cityName' element={<CityWeatherPage />} />

        <Route path='/home' element={<Navigate to='/' replace />} />
      </Routes>

      <AlertComponent />

      <InfoComponent />
    </AppContainer>
  );
};
