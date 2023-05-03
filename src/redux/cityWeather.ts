import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CityWeatherState, ErrorMessage, InfoMessage, Status } from '../types';
import {
  fetch24hoursForecast,
  fetchCityWeatherData,
  getErrorMessage,
  isCityAlreadyExists,
  isForecastAlreadyFetched,
} from '../utils/utils';
import { RootState } from './store';

const initialState: CityWeatherState = {
  cityWeatherData: JSON.parse(localStorage.getItem('cityWeatherData') || '[]'),
  cityWeatherForecastData: JSON.parse(
    localStorage.getItem('cityWeatherForecastData') || '[]'
  ),
  fetchStatus: Status.Idle,
  updateStatus: Status.Idle,
  forecastStatus: Status.Idle,
  errorMessage: '',
  inputValue: '',
  infoMessage: '',
};

export const fetchCityWeather = createAsyncThunk(
  'cityWeather/fetch',
  async (city: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const currentCityWeatherData = state.cityWeather.cityWeatherData;
    const cityAlreadyExists = isCityAlreadyExists(currentCityWeatherData, city);

    if (cityAlreadyExists) {
      return thunkAPI.rejectWithValue(ErrorMessage.DUPLICATE_CITY);
    }

    try {
      const cityWeatherData = await fetchCityWeatherData(city);

      if (cityWeatherData.cod === 429) {
        console.log('429 error occurred');
        return thunkAPI.rejectWithValue(ErrorMessage.TOO_MANY_REQUESTS);
      }

      return cityWeatherData;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(ErrorMessage.FETCH_ERROR);
    }
  }
);

export const updateCityWeatherThunk = createAsyncThunk(
  'cityWeather/update',
  async (city: string, thunkAPI) => {
    try {
      const cityWeatherData = await fetchCityWeatherData(city);

      if (cityWeatherData.cod === 429) {
        return thunkAPI.rejectWithValue(ErrorMessage.TOO_MANY_REQUESTS);
      }

      return cityWeatherData;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(ErrorMessage.UPDATE_ERROR);
    }
  }
);

export const fetchCityWeatherForecast = createAsyncThunk(
  'cityWeather/fetchForecast',
  async (city: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const currentCityWeatherForecastData =
      state.cityWeather.cityWeatherForecastData;
    const cityForecastAlreadyFetched = isForecastAlreadyFetched(
      currentCityWeatherForecastData,
      city
    );

    if (!cityForecastAlreadyFetched) {
      try {
        const cityWeatherForecastData = await fetch24hoursForecast(city);

        if (!cityWeatherForecastData) {
          return thunkAPI.rejectWithValue(ErrorMessage.FETCH_FORECAST_ERROR);
        }

        return cityWeatherForecastData;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        } else {
          return thunkAPI.rejectWithValue(ErrorMessage.FETCH_FORECAST_ERROR);
        }
      }
    }
  }
);

const cityWeatherSlice = createSlice({
  name: 'cityWeather',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
    deleteCityWeatherCard: (state, action) => {
      const cityName = state.cityWeatherData.find(
        (city) => city.id === action.payload
      )?.name;

      state.cityWeatherData = state.cityWeatherData.filter(
        (city) => city.id !== action.payload
      );
      localStorage.setItem(
        'cityWeatherData',
        JSON.stringify(state.cityWeatherData)
      );

      if (cityName) {
        state.cityWeatherForecastData = state.cityWeatherForecastData.filter(
          (forecast) => forecast.address !== cityName
        );
        localStorage.setItem(
          'cityWeatherForecastData',
          JSON.stringify(state.cityWeatherForecastData)
        );
      }

      state.infoMessage = InfoMessage.CITY_REMOVED;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.cityWeatherData = [...state.cityWeatherData, action.payload];
        localStorage.setItem(
          'cityWeatherData',
          JSON.stringify(state.cityWeatherData)
        );
        state.infoMessage = InfoMessage.CITY_ADDED;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.fetchStatus = Status.Failed;
        state.errorMessage = getErrorMessage(action.payload as string);
      })
      .addCase(updateCityWeatherThunk.pending, (state) => {
        state.updateStatus = Status.Loading;
      })
      .addCase(updateCityWeatherThunk.fulfilled, (state, action) => {
        state.cityWeatherData = state.cityWeatherData.map((city) => {
          const isUpToDate = city.dt === action.payload.dt;

          if (city.id === action.payload.id) {
            !isUpToDate
              ? (state.infoMessage = InfoMessage.CITY_UPDATED)
              : (state.infoMessage = InfoMessage.CITY_UPTODATE);

            state.updateStatus = Status.Succeeded;
            return action.payload;
          } else {
            return city;
          }
        });
        localStorage.setItem(
          'cityWeatherData',
          JSON.stringify(state.cityWeatherData)
        );
      })
      .addCase(updateCityWeatherThunk.rejected, (state, action) => {
        state.updateStatus = Status.Failed;
        state.errorMessage = getErrorMessage(action.payload as string);
      })
      .addCase(fetchCityWeatherForecast.pending, (state) => {
        state.forecastStatus = Status.Loading;
      })
      .addCase(fetchCityWeatherForecast.fulfilled, (state, action) => {
        if (action.payload) {
          state.forecastStatus = Status.Succeeded;
          state.cityWeatherForecastData = [
            ...state.cityWeatherForecastData,
            action.payload,
          ];
          localStorage.setItem(
            'cityWeatherForecastData',
            JSON.stringify(state.cityWeatherForecastData)
          );
        }
      })
      .addCase(fetchCityWeatherForecast.rejected, (state, action) => {
        state.forecastStatus = Status.Failed;
        state.errorMessage = getErrorMessage(action.payload as string);
      });
  },
});

export const {
  setInputValue,
  setErrorMessage,
  deleteCityWeatherCard,
  setInfoMessage,
} = cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;
