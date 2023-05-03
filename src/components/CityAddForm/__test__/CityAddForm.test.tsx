import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CityAddForm } from '../CityAddForm';
import { UniversalWrapper } from '../../../__mock__/UniversalWrapper';

describe('CityAddForm', () => {
  it('renders correctly', () => {
    render(<UniversalWrapper component={<CityAddForm />} />);

    expect(screen.getByText('Add a city')).toBeInTheDocument();
    expect(screen.getByText('Load Weather')).toBeInTheDocument();
  });

  it('handles input validation', async () => {
    render(<UniversalWrapper component={<CityAddForm />} />);
    const textField = screen.getByRole('textbox');

    fireEvent.change(textField, { target: { value: 'New York' } });
    expect(screen.getByText('Load Weather')).not.toBeDisabled();

    fireEvent.change(textField, { target: { value: '123' } });
    expect(screen.getByText('Load Weather')).toBeDisabled();
  });
});
