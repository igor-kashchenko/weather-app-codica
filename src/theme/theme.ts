import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Mont, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      '@media (min-width: 600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width: 960px)': {
        fontSize: '3rem',
      },
      '@media (min-width: 1280px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '1.8rem',
      '@media (min-width: 600px)': {
        fontSize: '2rem',
      },
      '@media (min-width: 960px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width: 1280px)': {
        fontSize: '3rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      '@media (min-width: 600px)': {
        fontSize: '1.6rem',
      },
    },
    h6: {
      fontSize: '2rem',
      '@media (min-width: 600px)': {
        fontSize: '1.3rem',
      },
    },
    subtitle1: {
      fontSize: '1.2rem',
      '@media (min-width: 600px)': {
        fontSize: '1.2rem',
      },
    },
    subtitle2: {
      fontSize: '1rem',
      '@media (min-width: 600px)': {
        fontSize: '0.8rem',
      },
    },
    body1: {
      fontSize: '0.9rem',
      '@media (min-width: 600px)': {
        fontSize: '1rem',
      },
      '@media (min-width: 960px)': {
        fontSize: '1.1rem',
      },
    },
    button: {
      fontSize: '0.6rem',
      '@media (min-width: 600px)': {
        fontSize: '0.8rem',
      },
      '@media (min-width: 960px)': {
        fontSize: '0.9rem',
      },
      '@media (min-width: 1280px)': {
        fontSize: '1rem',
      },
    },
  },
});
