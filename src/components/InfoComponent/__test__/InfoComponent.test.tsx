import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InfoComponent } from '../InfoComponent';
import { UniversalWrapper } from '../../../__mock__/UniversalWrapper';
import { setInfoMessage } from '../../../redux/cityWeather';
import { store } from '../../../redux/store';

describe('InfoComponent', () => {
  const renderInfoComponent = () => {
    return render(<UniversalWrapper component={<InfoComponent />} />);
  };

  it('renders the info message when provided', async () => {
    store.dispatch(setInfoMessage('Sample info message'));
    renderInfoComponent();
    expect(await screen.findByText('Sample info message')).toBeInTheDocument();
  });

  it('closes Snackbar when clicking away', async () => {
    store.dispatch(setInfoMessage('Another info message'));
    renderInfoComponent();
    const infoMessageElement = await screen.findByText('Another info message');
    expect(infoMessageElement).toBeInTheDocument();

    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(infoMessageElement).not.toBeInTheDocument();
    });
  });
});
