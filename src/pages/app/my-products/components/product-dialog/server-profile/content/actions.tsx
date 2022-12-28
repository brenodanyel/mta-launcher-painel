import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProductDialogStore } from '../../product-dialog.store';
import { useServerProfileStore } from '../server-profile.store';
import { useMyProducts } from '../../../../hooks/useMyProducts';
import { useConfirm } from 'material-ui-confirm';
import { useAuth } from '@/hooks/useAuth';

export function ProductInfoActions() {
  const confirm = useConfirm();
  const { hasRole } = useAuth();
  const { updateServerProfile, deleteServerProfile, isLoading } =
    useMyProducts();
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
  }

  async function handleDelete() {
    const key =
      'yes, delete this server profile' +
      ' ' +
      Math.ceil(Math.random() * 10000).toString();

    await confirm({
      title: 'Delete server profile?',
      titleProps: {
        textAlign: 'center',
      },
      confirmationText: 'Delete',
      dialogProps: {
        maxWidth: 'xs',
        PaperProps: { elevation: 0, variant: 'outlined' },
      },
      content: (
        <Stack sx={{ textAlign: 'center', gap: '0.5em', mb: '0.5em' }}>
          <Typography>
            Are you sure you want to delete this server profile?
          </Typography>
          <Typography fontSize='0.8em'>
            Note that this action cannot be undone!
          </Typography>
          <Typography fontSize='0.8em'>
            {`Please type "${key}" to confirm.`}
          </Typography>
        </Stack>
      ),
      confirmationKeyword: key,
      cancellationButtonProps: {
        color: 'error',
      },
    })
      .then(() => deleteServerProfile(productDialogStore.productId))
      .catch(() => console.log('deletion canceled'));
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
          <>
            {hasRole('admin') && (
              <Button
                startIcon={<DeleteIcon />}
                color='error'
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </Button>
            )}
            <Button
              startIcon={<EditIcon />}
              onClick={() => {
                productDialogStore.setMode('edit');
              }}
            >
              Edit
            </Button>
          </>
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
