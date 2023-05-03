import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../redux/store';
import { theme } from '../theme';

type Props = {
  component: React.ReactElement;
};

export const UniversalWrapper: React.FC<Props> = ({ component }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>{component}</Router>
    </ThemeProvider>
  </Provider>
);
