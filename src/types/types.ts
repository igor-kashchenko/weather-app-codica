export type Coord = {
  lon: number;
  lat: number;
}

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number
}

type Wind = {
  speed: number;
  deg: number;
  gust: number;
}

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

type Rain = {
  '1h': number;
  '3h': number;
}

type Clouds = {
  all: number;
}

export type CityWeather = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export type Hour = {
  datetime: string;
  temp: number;
}

export type CityWeatherForecast = {
  address: string;
  hoursData: Hour[];
  datetimeEpoch: number;
}

export type CityWeatherState = {
  cityWeatherData: CityWeather[];
  cityWeatherForecastData: CityWeatherForecast[];
  fetchStatus: Status;
  updateStatus: Status;
  forecastStatus: Status;
  errorMessage: string | ErrorMessage;
  inputValue: string;
  infoMessage: string | InfoMessage;
}

export enum ErrorMessage {
  FETCH_ERROR = 'Error fetching city weather data.',
  DUPLICATE_CITY = 'City is already added.',
  CITY_NOT_FOUND = 'City not found. Please check the name and try again.',
  UPDATE_ERROR = 'Error updating city weather data. Try again later.',
  FETCH_FORECAST_ERROR = 'Error fetching city forecast',
  TOO_MANY_REQUESTS = 'You have reached request limit, try again later'
}

export enum InfoMessage {
  CITY_ADDED = 'City was added',
  CITY_REMOVED = 'City was removed',
  CITY_UPDATED = 'The city\'s weather was updated',
  CITY_UPTODATE = 'The city\'s weather is up to date'
}
