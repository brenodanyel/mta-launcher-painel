import { Stack, Typography } from '@mui/material';
import { ProductPreviewCard } from './product-preview-card';

export function ProductPreview() {
  return (
    <Stack sx={{ padding: '1em', flexDirection: 'column', gap: '1em' }}>
      <Typography variant='h6' fontSize='1.5em'>
        PREVIEW
      </Typography>
      <ProductPreviewCard />
    </Stack>
  );
}
