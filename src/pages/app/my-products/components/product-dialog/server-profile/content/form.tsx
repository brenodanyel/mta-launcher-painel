import {
  Button,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import { useProductDialogStore } from '../../product-dialog.store';
import { useServerProfileStore } from '../server-profile.store';
import { FileInput } from '@/components/file-input';

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Fragment } from 'react';

const descriptionHelperTooltip = (
  <Tooltip
    arrow
    title={
      <Stack spacing='1em'>
        <Typography variant='caption'>
          You can use markdown! We recommend you to use some{' '}
          <Link href='https://dillinger.io/' target='_blank'>
            external markdown editing website
          </Link>{' '}
          with live preview, and then paste your markdown code here.
        </Typography>
        <Divider />
        <Typography variant='caption'>
          You can include images with the following syntax:{' '}
          <Typography variant='caption'>
            ![alt text](https://image.url)
          </Typography>
        </Typography>
        <Divider />
        <Typography variant='caption'>
          You can force line-breaks with the following syntax:{' '}
          <Typography variant='caption'>{'<br />'}</Typography>
        </Typography>
      </Stack>
    }
  >
    <InfoIcon />
  </Tooltip>
);

export function ProductInfoForm() {
  const { mode } = useProductDialogStore();

  const {
    errors,
    formData,
    updateFormDataItem,
    MAX_CHARACTERS_DESCRIPTION,
    MAX_LINKS,
  } = useServerProfileStore();

  return (
    <Grid container spacing='1em'>
      <Grid xs={12} sm={8}>
        <TextField
          label='Server IP'
          disabled={mode === 'view'}
          helperText={errors.ip() || ''}
          error={!!errors.ip()}
          value={formData.ip}
          onChange={(e) => {
            updateFormDataItem('ip', e.target.value);
          }}
        />
      </Grid>
      <Grid xs={12} sm={4}>
        <TextField
          label='Server Port'
          disabled={mode === 'view'}
          error={!!errors.port()}
          helperText={errors.port() || ''}
          value={formData.port}
          onChange={(e) => {
            updateFormDataItem('port', e.target.value);
          }}
        />
      </Grid>
      <Grid xs={12}>
        <FileInput
          title='IMAGE (128x128)'
          disabled={mode === 'view'}
          value={formData.logo}
          accept='image/png,image/jpeg,image/jpg'
          setValue={(value) => {
            updateFormDataItem('logo', value);
          }}
          blob={formData.logoBlob}
          setBlob={(blob) => {
            updateFormDataItem('logoBlob', blob);
          }}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          label='Description'
          multiline
          rows={15}
          disabled={mode === 'view'}
          error={!!errors.description()}
          value={formData.description}
          onChange={(e) => {
            updateFormDataItem('description', e.target.value);
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.25em 0',
          }}
        >
          <Stack direction='row' gap='0.25em'>
            {descriptionHelperTooltip}Help
          </Stack>
          <Typography
            variant='caption'
            color={errors.description() ? 'error' : 'text'}
          >
            {errors.description() ??
              `${formData.description.length}/${MAX_CHARACTERS_DESCRIPTION}`}
          </Typography>
        </Box>
      </Grid>
      {formData.links.map((link, index, arr) => (
        <Fragment key={link.id}>
          <Grid xs={12} sm={4}>
            <TextField
              label='Link Name'
              helperText={errors.linkName(link.name) || ''}
              error={!!errors.linkName(link.name)}
              disabled={mode === 'view'}
              value={link.name}
              onChange={(e) =>
                updateFormDataItem(
                  'links',
                  formData.links.map((l) => {
                    if (l.id === link.id) {
                      return { ...l, name: e.target.value };
                    }
                    return l;
                  }),
                )
              }
            />
          </Grid>
          <Grid xs={12} sm={8}>
            <TextField
              label='Link URL'
              helperText={errors.linkUrl(link.url) || ''}
              error={!!errors.linkUrl(link.url)}
              disabled={mode === 'view'}
              value={link.url}
              InputProps={{
                endAdornment: mode === 'edit' && (
                  <IconButton
                    sx={{
                      padding: 0,
                    }}
                    onClick={() => {
                      updateFormDataItem(
                        'links',
                        formData.links.filter((l) => l.id !== link.id),
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ),
              }}
              onChange={(e) => {
                updateFormDataItem(
                  'links',
                  formData.links.map((l) => {
                    if (l.id === link.id) {
                      return { ...l, url: e.target.value };
                    }
                    return l;
                  }),
                );
              }}
            />
          </Grid>
          {index !== arr.length - 1 && (
            <Grid xs={12}>
              <Divider variant='fullWidth' />
            </Grid>
          )}
        </Fragment>
      ))}
      {mode === 'edit' && (
        <Grid xs={12}>
          <Button
            fullWidth
            onClick={() => {
              updateFormDataItem('links', [
                ...formData.links,
                {
                  id: (formData.links.length + 1).toString(),
                  name: '',
                  url: '',
                },
              ]);
            }}
            disabled={formData.links.length >= MAX_LINKS}
          >
            Add Link
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
