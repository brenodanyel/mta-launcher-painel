import { Stack, Typography } from '@mui/material';
import { useDialogContext } from '../../../dialog-context';
import { ProductInfoForm } from './form';
import { ProductInfoActions } from './actions';
import { getExpiresIn } from '../../..';

export function ProductInfo() {
  const { dialogState } = useDialogContext();

  const product = dialogState?.product;

  if (!product) {
    return null;
  }

  return (
    <Stack sx={{ padding: '1em', flexDirection: 'column', gap: '1em' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1em',
          justifyContent: 'space-between',
        }}
      >
        <Stack sx={{ flexDirection: 'column' }}>
          <Typography variant='h6' fontSize='1.5em'>
            {product.name.toUpperCase()}
          </Typography>
          <Typography>EXPIRES: {' ' + getExpiresIn(product)}</Typography>
        </Stack>
        <ProductInfoActions />
      </Stack>
      <ProductInfoForm />
    </Stack>
  );
}
