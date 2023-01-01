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
  Icon,
  Autocomplete,
} from '@mui/material';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useProductDialogStore } from '../../product-dialog.store';
import { useServerProfileStore } from '../server-profile.store';
import { FileInput } from '@/components/file-input';

import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUsers } from '@/pages/app/my-products/hooks/useUsers';

const descriptionHelperTooltip = (
  <Tooltip
    arrow
    title={
      <Stack spacing='1em'>
        <Typography variant='caption'>
          You can use markdown! We recommend you to use some{' '}
          <Link href='https://stackedit.io/app#' target='_blank'>
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
    <Icon>info</Icon>
  </Tooltip>
);

function AdminOnlyForm() {
  const { mode } = useProductDialogStore();
  const { users } = useUsers();

  const {
    errors,
    formData,
    setFormData,
  } = useServerProfileStore();

  function getOwnerValue() {
    const user = users.find((user) => user.id === formData.ownerId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      label: `${user.username} - ${user.email}`,
    };
  }

  function getExpiresAtValue() {
    if (!formData.removeAt) {
      return null;
    }

    const date = moment(formData.removeAt);

    return date;
  }

  return (
    <>
      <Grid xs={12} lg={7}>
        <Autocomplete
          disabled={mode === 'view'}
          options={users.map((user) => ({
            id: user.id,
            label: `${user.username} - ${user.email}`,
          }))}
          value={getOwnerValue()}
          onChange={(e, value) => {
            setFormData({
              ...formData,
              ownerId: value?.id,
            });
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField
            {...params}
            label="Owner"
            helperText={errors.ownerId() || ''}
            error={!!errors.ownerId()}
          />}
        />
      </Grid>
      <Grid xs={12} lg={5}>
        <DateTimePicker
          value={getExpiresAtValue()}
          inputFormat='DD/MM/yyyy HH:mm'
          ampm={false}
          disabled={mode === 'view'}
          onChange={(newValue) => {
            setFormData({
              ...formData,
              removeAt: newValue
                ? newValue?.toDate()
                : null,
            });
          }}
          renderInput={(params) => <TextField
            {...params}
            label="Expires at"
            helperText={errors.removeAt() || ''}
            error={!!errors.removeAt()}
          />}
        />
      </Grid>
    </>
  );
}

export function ProductInfoForm() {
  const { mode } = useProductDialogStore();
  const { hasRole } = useAuth();

  const {
    errors,
    formData,
    updateFormDataItem,
    MAX_CHARACTERS_DESCRIPTION,
    MAX_LINKS,
  } = useServerProfileStore();

  return (
    <Grid container spacing='1em'>
      {hasRole('admin') && <AdminOnlyForm />}
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
                endAdornment: mode !== 'view' && (
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
                    <Icon>delete</Icon>
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
      {mode !== 'view' && (
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
