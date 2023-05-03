import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AlertComponent } from '../AlertComponent';
import { UniversalWrapper } from '../../../__mock__/UniversalWrapper';
import { store } from '../../../redux/store';
import { setErrorMessage } from '../../../redux/cityWeather';
import '@testing-library/jest-dom';

describe('AlertComponent', () => {
  const renderAlertComponent = () => {
    return render(<UniversalWrapper component={<AlertComponent />} />);
  };

  it('renders the error message when provided', async () => {
    store.dispatch(setErrorMessage('Sample error message'));
    renderAlertComponent();
    expect(await screen.findByText('Sample error message')).toBeInTheDocument();
  });

  it('closes Snackbar when clicking away', async () => {
    store.dispatch(setErrorMessage('Another error message'));
    renderAlertComponent();
    const alert = await screen.findByText('Another error message');
    expect(alert).toBeInTheDocument();

    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(alert).not.toBeInTheDocument();
    });
  });
});
