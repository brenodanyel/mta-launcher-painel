import {
  Dialog,
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  Tooltip,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useProductsDialogStore } from '../hooks/useProductsDialogStore';
import { useAllProducts } from '../hooks/useAllProducts';
import { useState } from 'react';

export function ProductDialog() {
  const [isSaving, setIsSaving] = useState(false);
  const { createProduct, updateProduct } = useAllProducts();

  const { open, setOpen, formData, setFormData, errors, productId, action } =
    useProductsDialogStore();

  function disableSaveButton() {
    if (errors.name()) {
      return true;
    }

    if (errors.price()) {
      return true;
    }

    for (const advantage of formData.advantages) {
      if (errors.advantage(advantage.description)) {
        return true;
      }
    }

    return false;
  }

  async function handleSave() {
    setIsSaving(true);

    if (action === 'create') {
      await createProduct({
        id: '',
        name: formData.name,
        price: Number(formData.price),
        advantages: formData.advantages,
        active: formData.active,
      });
    } else if (action === 'edit') {
      await updateProduct(productId, {
        name: formData.name,
        price: Number(formData.price),
        advantages: formData.advantages,
        active: formData.active,
      });
    }

    setIsSaving(false);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      PaperProps={{ variant: 'outlined', elevation: 0, sx: { p: '1em' } }}
      maxWidth='sm'
      fullWidth
      onClose={() => {
        setOpen(false);
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        <Stack direction='row' sx={{ alignItems: 'center', gap: '0.5em' }}>
          <EditIcon />
          <Typography variant='h5'>
            {action === 'create' ? 'Create new product' : 'Edit product'}
          </Typography>
        </Stack>
        <Grid container spacing='1em'>
          <Grid xs={12} sm={7}>
            <TextField
              label='Product Name'
              error={!!errors.name()}
              helperText={errors.name() || ''}
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid xs={12} sm={5}>
            <TextField
              label='Price'
              type='text'
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]+([.,][0-9]+)?',
              }}
              error={!!errors.price()}
              helperText={errors.price() || ''}
              value={formData.price}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price: e.target.value,
                });
              }}
            />
          </Grid>
          {formData.advantages.map((advantage, index) => (
            <Grid xs={12} key={advantage.id}>
              <TextField
                label='Advantage'
                type='text'
                error={!!errors.advantage(advantage.description)}
                helperText={errors.advantage(advantage.description) || ''}
                InputProps={{
                  endAdornment: (
                    <Tooltip title='Delete'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setFormData({
                            ...formData,
                            advantages: formData.advantages.filter(
                              (_advantage) => _advantage.id !== advantage.id,
                            ),
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
                value={advantage.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    advantages: formData.advantages.map((advantage, i) => {
                      if (i === index) {
                        return { ...advantage, description: e.target.value };
                      }
                      return advantage;
                    }),
                  });
                }}
              />
            </Grid>
          ))}
          <Grid xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                setFormData({
                  ...formData,
                  advantages: [
                    ...formData.advantages,
                    {
                      id: (formData.advantages.length + 1).toString(),
                      description: '',
                    },
                  ],
                });
              }}
            >
              Add Advantage
            </Button>
          </Grid>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.active}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      active: e.target.checked,
                    });
                  }}
                />
              }
              label='Active Product'
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{ marginLeft: 'auto' }}
          startIcon={<SaveIcon />}
          disabled={disableSaveButton()}
          type='submit'
          loading={isSaving}
          variant='contained'
        >
          {action === 'create' ? 'Create' : 'Save'}
        </LoadingButton>
      </form>
    </Dialog>
  );
}
