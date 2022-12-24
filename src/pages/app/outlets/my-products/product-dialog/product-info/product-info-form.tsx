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
import { useDialogContext } from '../../product-dialog-context';
import { FileInput } from '@/components/file-input';

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

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
          You can also include images with the following syntax:{' '}
          <Typography variant='caption'>![alt text](https://image.url)</Typography>
        </Typography>
      </Stack>
    }
  >
    <InfoIcon />
  </Tooltip>
);

export function ProductInfoForm() {
  const {
    formData,
    setFormData,
    dialogState,
    errors,
    MAX_CHARACTERS_DESCRIPTION,
    MAX_LINKS,
  } = useDialogContext();

  const mode = dialogState?.mode;

  if (!mode) {
    return null;
  }

  function handleInsertLink() {
    setFormData({
      ...formData,
      links: formData.links.concat({
        id: new Date().getTime(),
        name: '',
        url: '',
      }),
    });
  }

  return (
    <Grid container spacing='1em'>
      <Grid xs={12} sm={8}>
        <TextField
          label='Server IP'
          disabled={mode === 'view'}
          helperText={errors.ip()}
          error={!!errors.ip()}
          value={formData.ip}
          onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
        />
      </Grid>
      <Grid xs={12} sm={4}>
        <TextField
          label='Server Port'
          disabled={mode === 'view'}
          error={!!errors.port()}
          helperText={errors.port()}
          value={formData.port}
          onChange={(e) => setFormData({ ...formData, port: e.target.value })}
        />
      </Grid>
      <Grid xs={12}>
        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          <FileInput
            title='IMAGE (128x128 - max 1MB)'
            disabled={mode === 'view'}
            value={formData.logo}
            accept='image/png,image/jpeg,image/jpg'
            setValue={(value) => setFormData({ ...formData, logo: value })}
          />
        </Box>
      </Grid>
      <Grid xs={12}>
        <TextField
          label='Description'
          multiline
          rows={10}
          disabled={mode === 'view'}
          error={!!errors.description()}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
        <>
          <Grid key={link.id} xs={12} sm={4}>
            <TextField
              label='Link Name'
              helperText={errors.linkName(link)}
              error={!!errors.linkName(link)}
              disabled={mode === 'view'}
              value={link.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  links: formData.links.map((l) => {
                    if (l.id === link.id) {
                      return { ...l, name: e.target.value };
                    }
                    return l;
                  }),
                })
              }
            />
          </Grid>
          <Grid xs={12} sm={8}>
            <TextField
              label='Link URL'
              helperText={errors.linkUrl(link)}
              error={!!errors.linkUrl(link)}
              disabled={mode === 'view'}
              value={link.url}
              InputProps={{
                endAdornment: mode === 'edit' && (
                  <IconButton
                    sx={{
                      padding: 0,
                    }}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        links: formData.links.filter((l) => l.id !== link.id),
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ),
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  links: formData.links.map((l) => {
                    if (l.id === link.id) {
                      return { ...l, url: e.target.value };
                    }
                    return l;
                  }),
                })
              }
            />
          </Grid>
          {index !== arr.length - 1 && (
            <Grid xs={12}>
              <Divider variant='fullWidth' />
            </Grid>
          )}
        </>
      ))}
      {mode === 'edit' && (
        <Grid xs={12}>
          <Button
            fullWidth
            onClick={() => handleInsertLink()}
            disabled={formData.links.length >= MAX_LINKS}
          >
            Add Link
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
