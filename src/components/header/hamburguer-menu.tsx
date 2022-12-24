import { useRef, useState } from 'react';
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { pages } from '@/components/header';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export function HamburguerMenu() {
  const anchorRef = useRef(null);
  const [visible, setVisible] = useState(false);

  function handleToggle(elem?: HTMLElement) {
    if (elem) {
      return;
    }
  }

  return (
    <>
      <IconButton
        size='large'
        onClick={() => setVisible(true)}
        ref={anchorRef}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id='menu-appbar'
        anchorEl={anchorRef.current}
        open={visible}
        onClose={() => setVisible(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.href} onClick={() => setVisible(false)}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <Link
              component={RouterLink}
              to={page.href}
              key={page.href}
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              <ListItemText>{page.name}</ListItemText>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
