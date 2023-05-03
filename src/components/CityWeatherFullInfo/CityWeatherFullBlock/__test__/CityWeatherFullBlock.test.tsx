import React from 'react';
import { render } from '@testing-library/react';
import { CityWeatherFullBlock } from '../CityWeatherFullBlock';
import { UniversalWrapper } from '../../../../__mock__/UniversalWrapper';
import '@testing-library/jest-dom';
import { CityWeather } from '../../../../types';

const mockCityCard: CityWeather | null = {
  coord: { lon: -118.2437, lat: 34.0522 },
  weather: [
    { main: 'Clear', icon: '01d', id: 12313, description: 'some string' },
  ],
  base: 'stations',
  main: {
    temp: 293.15,
    temp_min: 290.15,
    temp_max: 295.15,
    pressure: 123,
    humidity: 123,
    feels_like: 123,
  },
  visibility: 10000,
  wind: { speed: 2.06, deg: 20, gust: 123 },
  clouds: { all: 1 },
  dt: 1633039200,
  sys: { country: 'US', id: 123, type: 123, sunrise: 123, sunset: 123 },
  timezone: -25200,
  id: 1,
  name: 'Los Angeles',
  cod: 200,
};

describe('CityWeatherFullBlock', () => {
  it('should render the city weather data when not updating', () => {
    const { getByText } = render(
      <UniversalWrapper
        component={<CityWeatherFullBlock cityWeather={mockCityCard} />}
      />
    );

    expect(getByText('Los Angeles, US')).toBeInTheDocument();
    expect(getByText('293°C')).toBeInTheDocument();
    expect(getByText('Clear')).toBeInTheDocument();
  });
});
