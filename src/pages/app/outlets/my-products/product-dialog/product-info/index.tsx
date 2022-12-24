import { Stack } from '@mui/material';
import { useDialogContext } from '../../product-dialog-context';
import { ProductInfoForm } from './product-info-form';
import { ProductInfoActions } from './product-info-actions';
import { ProductInfoHeader } from './product-info-header';

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
        <ProductInfoHeader />
        <ProductInfoActions />
      </Stack>
      <ProductInfoForm />
    </Stack>
  );
}
