import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { setErrorMessage } from '../../redux/cityWeather';

export const AlertComponent: React.FC = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const errorMessage = useAppSelector(
    (state) => state.cityWeather.errorMessage
  );
  const dispatch = useAppDispatch();

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);

    const timeoutId = setTimeout(() => {
      dispatch(setErrorMessage(''));
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    setIsSnackbarOpen(!!errorMessage);
  }, [errorMessage]);

  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleCloseAlert} severity={'error'}>
          <AlertTitle>Error</AlertTitle>

          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
