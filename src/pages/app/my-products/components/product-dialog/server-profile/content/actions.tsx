import { Box, Button, Icon, Link, Stack, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useProductDialogStore } from '../../product-dialog.store';
import { useServerProfileStore } from '../server-profile.store';
import { useMyProducts } from '../../../../hooks/useMyProducts';
import { useConfirm } from 'material-ui-confirm';
import { useAuth } from '@/hooks/useAuth';

export function ProductInfoActions() {
  const confirm = useConfirm();
  const { hasRole } = useAuth();
  const { updateServerProfile, deleteServerProfile, createServerProfile, isLoading } = useMyProducts();
  const productDialogStore = useProductDialogStore();
  const { errors, formData, resetFormData } = useServerProfileStore();

  async function handleSave() {
    await updateServerProfile(productDialogStore.productId, {
      ip: formData.ip,
      port: formData.port,
      description: formData.description,
      externalLinks: formData.links,
      logoBlob: formData.logoBlob,
      ownerId: formData.ownerId,
      removeAt: formData.removeAt,
    });
  }

  async function handleCreate() {
    await createServerProfile({
      ip: formData.ip,
      port: formData.port,
      description: formData.description,
      externalLinks: formData.links,
      logoBlob: formData.logoBlob,
      ownerId: formData.ownerId,
      removeAt: formData.removeAt,
    });
  }

  async function handleDelete() {
    const key = 'yes, delete this server profile' + ' ' + Math.ceil(Math.random() * 10000).toString();

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

    if (errors.ownerId()) {
      return true;
    }

    if (errors.removeAt()) {
      return true;
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
        {productDialogStore.mode === 'create' && (
          <>
            <LoadingButton
              variant='contained'
              startIcon={<Icon>add</Icon>}
              disabled={disableSave()}
              loading={isLoading}
              onClick={() => {
                console.log('create');
                handleCreate();
              }}
            >
              Create
            </LoadingButton>
          </>
        )}
        {productDialogStore.mode === 'view' && (
          <>
            {hasRole('admin') && (
              <Button
                startIcon={<Icon>delete</Icon>}
                color='error'
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </Button>
            )}
            <Tooltip title="You can share this link with anyone!" placement='bottom'>
              <Link
                color="inherit"
                href={`https://mta-launcher.com/profile/${formData.ip}/${formData.port}`}
                target="_blank"
              >
                <Button startIcon={<Icon>share</Icon>}>
                  Profile Page
                </Button>
              </Link>
            </Tooltip>
            <Button
              startIcon={<Icon>edit</Icon>}
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
              startIcon={<Icon>cancel</Icon>}
              onClick={() => {
                productDialogStore.setMode('view');
                resetFormData();
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant='contained'
              startIcon={<Icon>save</Icon>}
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
