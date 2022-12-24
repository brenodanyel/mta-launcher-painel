import { useState, FormEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grow,
  Fade,
  Button,
  Link,
} from '@mui/material';
import { PasswordInput } from '@/components/password-input';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const errors = {
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
                LOG IN TO YOUR ACCOUNT
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
                <Button type='submit' disabled={validateForm()}>
                  Register
                </Button>
                <Typography
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {'DON\'T HAVE AN ACCOUNT? '}
                  <Link
                    sx={{
                      cursor: 'pointer',
                    }}
                    component={RouterLink}
                    to={'/register'}
                  >
                    SIGN UP
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
