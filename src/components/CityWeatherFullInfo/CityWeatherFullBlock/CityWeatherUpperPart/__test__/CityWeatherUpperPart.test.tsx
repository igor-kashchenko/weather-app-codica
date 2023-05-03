import React from 'react';
import { render } from '@testing-library/react';
import { CityWeatherUpperPart } from '../CityWeatherUpperPart';
import { UniversalWrapper } from '../../../../../__mock__/UniversalWrapper';
import '@testing-library/jest-dom';

describe('CityWeatherUpperPart', () => {
  it('should display the correct data', () => {
    const props = {
      dt: 1620140400,
      lat: 40.7128,
      lon: -74.006,
      name: 'New York',
      country: 'US',
      timezone: -14400,
    };

    const { getByText } = render(
      <UniversalWrapper component={<CityWeatherUpperPart {...props} />} />
    );

    expect(getByText('May 4, 6:00pm')).toBeInTheDocument();

    expect(getByText('40.7128° N, 74.0060° W')).toBeInTheDocument();

    expect(getByText('New York, US')).toBeInTheDocument();

    expect(getByText('GMT-4')).toBeInTheDocument();
  });
});
