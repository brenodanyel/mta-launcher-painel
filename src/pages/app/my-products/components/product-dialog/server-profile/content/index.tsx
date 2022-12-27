import { Stack, Typography } from '@mui/material';
import { ProductInfoForm } from './form';
import { ProductInfoActions } from './actions';

export function ServerProfileInfo() {
  return (
    <Stack sx={{ padding: '1em', flexDirection: 'column', gap: '1em' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1em',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h6' fontSize='1.5em'>
          SERVER PROFILE
        </Typography>
        <ProductInfoActions />
      </Stack>
      <ProductInfoForm />
    </Stack>
  );
}
