import { configureStore } from '@reduxjs/toolkit';
import cityWeatherSlice from './cityWeather';

export const store = configureStore({
  reducer: {
    cityWeather: cityWeatherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
