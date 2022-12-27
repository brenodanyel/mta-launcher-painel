import { Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function AllProducts() {
  return (
    <Stack gap='0.5em'>
      <Stack direction='row' alignItems='center' gap='0.5em'>
        <ShoppingCartIcon />
        <Typography variant='h6'>All Products</Typography>
      </Stack>
      <Stack direction='row' flexWrap='wrap' gap='0.5em'>
        <Typography>There are no products available.</Typography>
      </Stack>
    </Stack>
  );
}
