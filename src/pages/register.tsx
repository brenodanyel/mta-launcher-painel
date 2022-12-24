import { useState, FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Fade,
  Button,
  Link,
  Grow,
} from '@mui/material';
import { PasswordInput } from '@/components/password-input';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const errors = {
    username() {
      if (formData.username === '') {
        return 'Username is required';
      }
    },
    email() {
      if (formData.email === '') {
        return 'E-mail is required';
      }
      if (!validator.isEmail(formData.email)) {
        return 'E-mail is invalid';
      }
    },
    password() {
      if (formData.password === '') {
        return 'Password is required';
      }
      if (formData.password.length < 6) {
        return 'Password must be at least 6 characters long';
      }
    },
    passwordConfirm() {
      if (formData.passwordConfirm === '') {
        return 'Password confirmation is required';
      }
      if (formData.passwordConfirm !== formData.password) {
        return 'Password confirmation must match password';
      }
    },
  };

  function validateForm() {
    return Object.values(errors).some((error) => error());
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Grow in>
      <Fade in>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '2rem',
                width: 'clamp(400px, 40%, 500px)',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <Typography
                sx={{
                  width: '60%',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                CREATE A NEW ACCOUNT
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '1rem',
                }}
              >
                <TextField
                  label='Username'
                  error={!!errors.username()}
                  helperText={errors.username()}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
                <TextField
                  label='E-mail'
                  type='email'
                  error={!!errors.email()}
                  helperText={errors.email()}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <PasswordInput
                  label='Password'
                  type='password'
                  error={!!errors.password()}
                  helperText={errors.password()}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <PasswordInput
                  label='Password Confirmation'
                  type='password'
                  error={!!errors.passwordConfirm()}
                  helperText={errors.passwordConfirm()}
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      passwordConfirm: e.target.value,
                    }))
                  }
                />
                <Button type='submit' disabled={validateForm()}>
                  Register
                </Button>
                <Typography
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  ALREADY HAVE AN ACCOUNT?{' '}
                  <Link
                    href='/login'
                    sx={{
                      cursor: 'pointer',
                    }}
                    component={RouterLink}
                    to={'/login'}
                  >
                    SIGN IN
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </form>
      </Fade>
    </Grow>
  );
}
