import React from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCityWeather, setInputValue } from '../../redux/cityWeather';
import { useInputValidation } from '../../hooks/useInputValidation';
import { Status } from '../../types';

export const CityAddForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const cityValue = useAppSelector((state) => state.cityWeather.inputValue);
  const { inputError, helperText, validate } = useInputValidation((value) =>
    /^[a-zA-Z\s]*$/.test(value)
  );
  const status = useAppSelector((state) => state.cityWeather.fetchStatus);
  const isLoading = status === Status.Loading;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    validate(inputValue);

    dispatch(setInputValue(inputValue));
  };

  const handleLoadWeather = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputError) {
      dispatch(fetchCityWeather(cityValue));
      dispatch(setInputValue(''));
    }
  };

  return (
    <Box
      component='form'
      sx={{ mt: 2, display: 'flex' }}
      onSubmit={handleLoadWeather}
    >
      <TextField
        label='Add a city'
        variant='outlined'
        sx={{ mr: 3, flexGrow: 1 }}
        onChange={handleInputChange}
        value={cityValue}
        required
        error={inputError}
        helperText={helperText}
      />
      <Button variant='contained' type='submit' disabled={inputError}>
        {isLoading ? (
          <Box display='flex' alignItems='center'>
            Loading...
            <CircularProgress sx={{ color: '#fff', ml: 1 }} />
          </Box>
        ) : (
          'Load Weather'
        )}
      </Button>
    </Box>
  );
};
