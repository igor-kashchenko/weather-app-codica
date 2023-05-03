import React from 'react';
import { CityWeather, CityWeatherForecast, ErrorMessage, Hour } from '../types';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import WestIcon from '@mui/icons-material/West';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import EastIcon from '@mui/icons-material/East';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthIcon from '@mui/icons-material/South';

export const API_KEY = process.env.REACT_APP_API_KEY;
export const API_URL = process.env.REACT_APP_API_URL;
export const ICON_URL = process.env.REACT_APP_ICON_URL;
export const FORECAST_URL = process.env.REACT_APP_FORECAST_URL;
export const FORECAST_API_KEY = process.env.REACT_APP_FORECAST_API_KEY;

export const roundTemp = (temp: number) => {
  return Math.round(temp);
};

export const parseTimeStamp = (dt: number, sunrise?: string) => {
  const date = new Date(dt * 1000);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12 || 12;

  if (sunrise) {
    return `${hours12}:${minutes}${ampm}`;
  }

  return `${month} ${day}, ${hours12}:${minutes}${ampm}`;
};

export const formatCoordinates = (lat: number, lon: number) => {
  const latitude =
    lat >= 0 ? `${lat.toFixed(4)}° N` : `${(-lat).toFixed(4)}° S`;
  const longitude =
    lon >= 0 ? `${lon.toFixed(4)}° E` : `${(-lon).toFixed(4)}° W`;
  return `${latitude}, ${longitude}`;
};

export const formatTimezone = (offsetSeconds: number) => {
  const sign = offsetSeconds >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offsetSeconds) / 3600);
  return `GMT${sign}${hours}`;
};

export const fetchCityWeatherData = async (city: string) => {
  const cityWeatherURL = `${API_URL}&q=${city}&appid=${API_KEY}`;
  const cityWeatherAPIResponse = await fetch(cityWeatherURL);
  const cityWeatherData = await cityWeatherAPIResponse.json();

  if (cityWeatherData.cod === '404') {
    throw new Error(ErrorMessage.CITY_NOT_FOUND);
  }

  return cityWeatherData;
};

export const formatWindDirection = (deg: number) => {
  let direction;

  switch (true) {
  case deg >= 337.5 || deg < 22.5:
    direction = 'North';
    break;

  case deg >= 22.5 && deg < 67.5:
    direction = 'Northeast';
    break;

  case deg >= 67.5 && deg < 112.5:
    direction = 'East';
    break;

  case deg >= 112.5 && deg < 157.5:
    direction = 'Southeast';
    break;

  case deg >= 157.5 && deg < 202.5:
    direction = 'South';
    break;

  case deg >= 202.5 && deg < 247.5:
    direction = 'Southwest';
    break;

  case deg >= 247.5 && deg < 292.5:
    direction = 'West';
    break;

  case deg >= 292.5 && deg < 337.5:
    direction = 'Northwest';
    break;

  default:
    direction = 'Unknown';
    break;
  }

  return direction;
};

export const getWindDirectionIcon = (direction: string) => {
  switch (direction) {
  case 'North':
    return <NorthIcon />;
  case 'Northeast':
    return <NorthEastIcon />;
  case 'East':
    return <EastIcon />;
  case 'Southeast':
    return <SouthEastIcon />;
  case 'South':
    return <SouthIcon />;
  case 'Southwest':
    return <SouthWestIcon />;
  case 'West':
    return <WestIcon />;
  case 'Northwest':
    return <NorthWestIcon />;
  default:
    return null;
  }
};

export const isCityAlreadyExists = (
  cityWeatherData: CityWeather[],
  city: string
) => {
  return cityWeatherData.some((dataCity) => dataCity.name === city);
};

export const getErrorMessage = (errorType: string) => {
  switch (errorType) {
  case ErrorMessage.FETCH_ERROR:
    return ErrorMessage.FETCH_ERROR;

  case ErrorMessage.DUPLICATE_CITY:
    return ErrorMessage.DUPLICATE_CITY;

  case ErrorMessage.CITY_NOT_FOUND:
    return ErrorMessage.CITY_NOT_FOUND;

  case ErrorMessage.UPDATE_ERROR:
    return ErrorMessage.UPDATE_ERROR;

  case ErrorMessage.FETCH_FORECAST_ERROR:
    return ErrorMessage.FETCH_FORECAST_ERROR;

  case ErrorMessage.TOO_MANY_REQUESTS:
    return ErrorMessage.TOO_MANY_REQUESTS;

  default:
    return ErrorMessage.FETCH_ERROR;
  }
};

export const fetch24hoursForecast = async (city: string) => {
  const forecastWeatherURL = `${FORECAST_URL}${city}/today?unitGroup=metric&include=hours%2Ccurrent&key=${FORECAST_API_KEY}&contentType=json`;
  const forecastAPIResponse = await fetch(forecastWeatherURL);
  const forecastData = await forecastAPIResponse.json();

  const { address } = forecastData;
  const { hours } = forecastData.days[0];
  const { datetimeEpoch } = forecastData.currentConditions;

  const hoursData = hours.map((hour: Hour) => {
    const { datetime, temp } = hour;
    const formattedDate = convertTo12Hour(datetime);
    const roundedTemp = roundTemp(temp);

    return { datetime: formattedDate, temp: roundedTemp };
  });

  return {
    address,
    hoursData,
    datetimeEpoch,
  };
};

export const isForecastAlreadyFetched = (
  cityWeatherForecastData: CityWeatherForecast[],
  city: string
) => {
  return cityWeatherForecastData.some((dataCity) => dataCity.address === city);
};

export const convertTo12Hour = (timeStr: string) => {
  const [hour, minute] = timeStr.split(':');
  let hourInt = parseInt(hour, 10);
  let period = 'am';

  switch (true) {
  case hourInt === 0:
    hourInt = 12;
    break;
  case hourInt === 12:
    period = 'pm';
    break;
  case hourInt > 12:
    hourInt -= 12;
    period = 'pm';
    break;
  default:
    break;
  }

  return `${hourInt}:${minute} ${period}`;
};
