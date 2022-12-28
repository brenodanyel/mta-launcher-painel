import { useState } from 'react';
import { IconButton, TextField, TextFieldProps, Icon } from '@mui/material';

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
            <Icon>{type === 'password' ? 'visibility' : 'visibility_off'}</Icon>
          </IconButton>
        ),
      }}
    />
  );
}
