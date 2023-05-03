import React from 'react';
import { render } from '@testing-library/react';
import { CityWeatherBottomPart } from '../CityWeatherBottomPart';
import { UniversalWrapper } from '../../../../../__mock__/UniversalWrapper';
import '@testing-library/jest-dom';

describe('CityWeatherBottomPart', () => {
  it('should display the correct data', () => {
    const props = {
      deg: 180,
      speed: 5,
      pressure: 1000,
      humidity: 80,
      rain1h: 10,
      all: 50,
      visibility: 1000,
      sea_level: 2,
      grnd_level: 10,
      sunrise: 1620086400,
      sunset: 1620140400,
    };

    const { getByText, getByTitle } = render(
      <UniversalWrapper component={<CityWeatherBottomPart {...props} />} />
    );

    expect(getByText('5m/s')).toBeInTheDocument();

    expect(getByText('1000 hPa')).toBeInTheDocument();

    expect(getByText('80%')).toBeInTheDocument();

    expect(getByText('10mm')).toBeInTheDocument();

    expect(getByText('50%')).toBeInTheDocument();

    expect(getByText('1000m')).toBeInTheDocument();

    expect(getByText('2m')).toBeInTheDocument();

    expect(getByText('10m')).toBeInTheDocument();

    expect(getByTitle('Wind South')).toBeInTheDocument();
  });
});
