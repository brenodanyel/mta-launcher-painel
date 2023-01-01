import {
  Dialog,
  Divider,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ServerProfileInfo } from './server-profile/content';
import { useProductDialogStore } from './product-dialog.store';
import { ProductPreview } from './server-profile/preview';

function DialogContent() {
  const productDialogStore = useProductDialogStore();

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  if (productDialogStore.productName === 'Server Profile') {
    return (
      <Grid container sx={{ height: '100%' }}>
        <Grid xs={12} lg={6} sx={{ height: '100%' }}>
          <ServerProfileInfo />
        </Grid>
        <Grid xs={lg ? 0 : 12}>
          <Divider orientation={lg ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid xs={12} lg={6} sx={{ height: '100%' }}>
          <ProductPreview />
        </Grid>
      </Grid>
    );
  }

  return null;
}

export function ProductDialog() {
  const productDialogStore = useProductDialogStore();

  return (
    <Dialog
      open={productDialogStore.open}
      onClose={() => productDialogStore.setOpen(false)}
      maxWidth='xl'
      fullWidth
      PaperProps={{
        variant: 'outlined',
        elevation: 0,
        sx: {
          height: '100vh',
        }
      }}
      sx={{
        height: '100vh',
      }}
    >
      <DialogContent />
    </Dialog>
  );
}
