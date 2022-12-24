import { useRef, useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

export function ProfileIcon() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Tooltip title='Open menu' arrow enterDelay={500}>
        <IconButton onClick={() => setVisible(true)} sx={{ p: 0 }} ref={ref}>
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <MenuItem onClick={() => setVisible(false)}>
          <Typography textAlign='center'>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
