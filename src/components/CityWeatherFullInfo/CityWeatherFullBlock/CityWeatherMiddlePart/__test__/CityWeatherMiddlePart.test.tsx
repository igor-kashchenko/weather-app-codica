import React from 'react';
import { render } from '@testing-library/react';
import { CityWeatherMiddlePart } from '../CityWeatherMiddlePart';
import '@testing-library/jest-dom';
import { UniversalWrapper } from '../../../../../__mock__/UniversalWrapper';

describe('CityWeatherMiddlePart', () => {
  it('should display the correct data', () => {
    const props = {
      icon: '01d',
      main: 'Clear',
      description: 'clear sky',
      temp: 25.6,
      feels_like: 26.7,
      temp_max: 27.8,
      temp_min: 22.4,
    };

    const { getByText, getByAltText } = render(
      <UniversalWrapper component={<CityWeatherMiddlePart {...props} />} />
    );

    expect(getByText('Clear')).toBeInTheDocument();

    expect(getByText('clear sky')).toBeInTheDocument();

    expect(getByText('26°C')).toBeInTheDocument();

    expect(getByText('Feels like: 27°C')).toBeInTheDocument();

    expect(getByText('High: 28°C')).toBeInTheDocument();

    expect(getByText('Low: 22°C')).toBeInTheDocument();

    expect(getByAltText('weather icon')).toHaveAttribute(
      'src',
      `https://openweathermap.org/img/wn/${props.icon}@4x.png`
    );
  });
});
