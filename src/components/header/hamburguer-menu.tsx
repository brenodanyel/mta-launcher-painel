import { useRef, useState } from 'react';
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Icon,
} from '@mui/material';
import { pages } from '@/components/header';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';

export function HamburguerMenu() {
  const { pathname } = useLocation();
  const anchorRef = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton
        size='large'
        onClick={() => setVisible(true)}
        ref={anchorRef}
        color='inherit'
      >
        <Icon>menu</Icon>
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
          <MenuItem
            key={page.href}
            onClick={() => setVisible(false)}
            selected={!!matchPath(page.href, pathname)}
          >
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
