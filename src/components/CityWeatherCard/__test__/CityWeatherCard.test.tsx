import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityWeatherCard } from '../CityWeatherCard';
import { UniversalWrapper } from '../../../__mock__/UniversalWrapper';
import { useAppDispatch } from '../../../redux/hooks';
import '@testing-library/jest-dom';

jest.mock('../../../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

const mockCityCard = {
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

describe('CityWeatherCard', () => {
  it('renders city name and temperature', () => {
    render(
      <UniversalWrapper
        component={
          <CityWeatherCard
            cityCard={mockCityCard}
            isCityUpdating={false}
            setUpdatingCity={jest.fn()}
          />
        }
      />
    );

    expect(screen.getByText('Los Angeles, US')).toBeInTheDocument();
    expect(screen.getByText('293°C')).toBeInTheDocument();
  });

  it('calls update and delete functions', () => {
    const setUpdatingCity = jest.fn();
    const dispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(
      <UniversalWrapper
        component={
          <CityWeatherCard
            cityCard={mockCityCard}
            isCityUpdating={false}
            setUpdatingCity={setUpdatingCity}
          />
        }
      />
    );

    fireEvent.click(screen.getByTitle('update weather'));
    expect(setUpdatingCity).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();

    fireEvent.click(screen.getByTitle('delete city'));
    expect(dispatch).toHaveBeenCalled();
  });
});
