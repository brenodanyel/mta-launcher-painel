import { Stack, IconButton, Tooltip, Icon } from '@mui/material';

type ProductCardAdminActionsProps = {
  onClickEdit(): void;
  onClickDelete(): void;
};

export function ProductCardAdminActions(props: ProductCardAdminActionsProps) {
  const { onClickEdit, onClickDelete } = props;

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
          <Icon>edit</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete'>
        <IconButton onClick={onClickDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
