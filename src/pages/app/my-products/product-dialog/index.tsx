import {
  Dialog,
  Divider,
  Unstable_Grid2 as Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ProductInfo } from './server-profile/content';
import { useDialogContext } from '../dialog-context';
import { ProductPreview } from './server-profile/preview';

export function ProductDialog() {
  const { dialogState, setDialogState } = useDialogContext();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Dialog
      open={!!dialogState}
      onClose={() => setDialogState(undefined)}
      maxWidth='lg'
      fullWidth
      // key={dialogState?.mode}
      PaperProps={{
        elevation: 0,
        variant: 'outlined',
      }}
    >
      <Grid container>
        <Grid xs={12} md={7}>
          <ProductInfo />
        </Grid>
        <Grid xs={md ? 0 : 12}>
          <Divider orientation={md ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid xs={12} md={5}>
          <ProductPreview />
        </Grid>
      </Grid>
    </Dialog>
  );
}
