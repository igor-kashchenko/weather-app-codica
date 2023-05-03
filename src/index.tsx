import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Root: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router basename='weather-app-codica'>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Root />);
