import { Stack, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ProductCardAdminActionsProps = {
  onClickEdit: () => void;
};

export function ProductCardAdminActions(props: ProductCardAdminActionsProps) {
  const { onClickEdit } = props;

  return (
    <Stack
      direction='row'
      sx={{
        position: 'absolute',
        top: '0.25em',
        right: '0.25em',
      }}
    >
      <Tooltip title='Edit'>
        <IconButton onClick={onClickEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete'>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
