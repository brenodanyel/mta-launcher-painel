import { Box, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDialogContext } from '../../product-dialog-context';

export function ProductInfoActions() {
  const { dialogState, setDialogState, formData, resetFormData, errors } =
    useDialogContext();

  const mode = dialogState?.mode;

  if (!mode) {
    return null;
  }

  function handleSave() {
    setDialogState(undefined);
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
      if (errors.linkName(link)) {
        return true;
      }
      if (errors.linkUrl(link)) {
        return true;
      }
    }

    false;
  }

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1em',
        }}
      >
        {mode === 'view' && (
          <Button
            startIcon={<EditIcon />}
            onClick={() => {
              setDialogState({ ...dialogState, mode: 'edit' });
            }}
          >
            Edit
          </Button>
        )}
        {mode === 'edit' && (
          <>
            <Button
              color='error'
              startIcon={<CancelIcon />}
              onClick={() => {
                setDialogState({
                  ...dialogState,
                  mode: 'view',
                });
                resetFormData();
              }}
            >
              Cancel
            </Button>
            <Button
              startIcon={<SaveIcon />}
              disabled={disableSave()}
              onClick={() => {
                handleSave();
                resetFormData();
              }}
            >
              Save
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
