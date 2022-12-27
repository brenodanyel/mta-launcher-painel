import { Box, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useProductDialogStore } from '../../product-dialog.store';
import { useServerProfileStore } from '../server-profile.store';
import { useMyProducts } from '../../../hooks/useMyProducts';

export function ProductInfoActions() {
  const { updateServerProfile, isLoading } = useMyProducts();
  const productDialogStore = useProductDialogStore();
  const { errors, formData, resetFormData } = useServerProfileStore();

  async function handleSave() {
    
    await updateServerProfile(productDialogStore.productId, {
      ip: formData.ip,
      port: formData.port,
      description: formData.description,
      externalLinks: formData.links,
      logoBlob: formData.logoBlob,
    });
    // productDialogStore.setOpen(false);
  }

  function disableSave() {
    if (errors.ip()) {
      return true;
    }

    if (errors.port()) {
      return true;
    }

    if (errors.description()) {
      return true;
    }

    for (const link of formData.links) {
      if (errors.linkName(link.name)) {
        return true;
      }

      if (errors.linkUrl(link.url)) {
        return true;
      }
    }

    return false;
  }

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1em',
        }}
      >
        {productDialogStore.mode === 'view' && (
          <Button
            startIcon={<EditIcon />}
            onClick={() => {
              productDialogStore.setMode('edit');
            }}
          >
            Edit
          </Button>
        )}
        {productDialogStore.mode === 'edit' && (
          <>
            <Button
              color='error'
              startIcon={<CancelIcon />}
              onClick={() => {
                productDialogStore.setMode('view');
                resetFormData();
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant='contained'
              startIcon={<SaveIcon />}
              disabled={disableSave()}
              loading={isLoading}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </LoadingButton>
          </>
        )}
      </Stack>
    </Box>
  );
}
