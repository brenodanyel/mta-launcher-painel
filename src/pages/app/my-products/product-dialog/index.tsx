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
  const md = useMediaQuery(theme.breakpoints.up('md'));

  if (productDialogStore.productName === 'Server Profile') {
    return (
      <Grid container>
        <Grid xs={12} md={7}>
          <ServerProfileInfo />
        </Grid>
        <Grid xs={md ? 0 : 12}>
          <Divider orientation={md ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid xs={12} md={5}>
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
      maxWidth='lg'
      fullWidth
      PaperProps={{ variant: 'outlined', elevation: 0 }}
    >
      <DialogContent />
    </Dialog>
  );
}
