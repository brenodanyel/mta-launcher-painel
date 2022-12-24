import { useState } from 'react';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function PasswordInput(props: TextFieldProps) {
  const [type, setType] = useState('password');

  function handleClick() {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }

  return (
    <TextField
      {...props}
      type={type}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <IconButton onClick={handleClick} size='small'>
            {type === 'password' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
}
