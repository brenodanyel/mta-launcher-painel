import { Box, Divider, Stack, Typography } from '@mui/material';
import { ProductInfoForm } from './form';
import { ProductInfoActions } from './actions';

export function ServerProfileInfo() {
  return (
    <Stack sx={{ padding: '1em', gap: '0.5em', height: '100%' }}>
      <Stack
        direction="row"
        sx={{
          gap: '1em',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h6' fontSize='1.5em'>
          SERVER PROFILE
        </Typography>
        <ProductInfoActions />
      </Stack>
      <Divider />
      <Box sx={{ padding: '1em', overflow: 'auto' }}>
        <ProductInfoForm />
      </Box>
    </Stack>
  );
}
