import { Stack, Typography } from '@mui/material';
import { getExpiresIn } from '../..';
import { useDialogContext } from '../../product-dialog-context';

export function ProductInfoHeader() {
  const { dialogState } = useDialogContext();

  const product = dialogState?.product;

  if (!product) {
    return null;
  }

  return (
    <Stack sx={{ flexDirection: 'column' }}>
      <Typography variant='h6' fontSize='1.5em'>
        {product.name.toUpperCase()}
      </Typography>
      <Typography>EXPIRES {' ' + getExpiresIn(product)}</Typography>
    </Stack>
  );
}
