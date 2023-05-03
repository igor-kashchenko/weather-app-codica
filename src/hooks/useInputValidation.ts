import { useState } from 'react';

export const useInputValidation = (validator: (value: string) => boolean) => {
  const [inputError, setInputError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validate = (value: string) => {
    if (validator(value)) {
      setInputError(false);
      setHelperText('');
    } else {
      setInputError(true);
      setHelperText('Only letters are allowed');
    }
  };

  return { inputError, helperText, validate };
};
