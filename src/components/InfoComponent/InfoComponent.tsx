import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { setInfoMessage } from '../../redux/cityWeather';
import { InfoMessage } from '../../types';

export const InfoComponent: React.FC = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const infoMessage = useAppSelector((state) => state.cityWeather.infoMessage);
  const dispatch = useAppDispatch();

  const infoSeverity =
    infoMessage === InfoMessage.CITY_REMOVED ||
    infoMessage === InfoMessage.CITY_UPTODATE;

  const handleCloseInfo = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);

    const timeoutId = setTimeout(() => {
      dispatch(setInfoMessage(''));
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    setIsSnackbarOpen(!!infoMessage);
  }, [infoMessage]);

  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseInfo}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleCloseInfo}
          severity={`${infoSeverity ? 'info' : 'success'}`}
        >
          <AlertTitle>{`${infoSeverity ? 'Info' : 'Success'}`}</AlertTitle>

          {infoMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
