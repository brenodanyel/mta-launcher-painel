import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
  Icon,
} from '@mui/material';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { HamburguerMenu } from './hamburguer-menu';
import { ProfileIcon } from './profile-icon';

export const pages = [
  {
    name: 'My Products',
    href: '/',
    icon: <Icon color='disabled'>inventory</Icon>,
  },
  {
    name: 'All Products',
    href: '/all-products',
    icon: <Icon color='disabled'>shopping_cart</Icon>,
  },
];

export function Header() {
  const { pathname } = useLocation();

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <HamburguerMenu />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              flexGrow: 1,
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              MTASA Launcher
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex', gap: '0.5em' } }}>
              {pages.map((page) => (
                <Link
                  key={page.href}
                  underline='none'
                  sx={{ color: 'inherit' }}
                  component={RouterLink}
                  to={page.href}
                >
                  <Button
                    variant={
                      matchPath(page.href, pathname) ? 'outlined' : 'text'
                    }
                    sx={{ color: 'inherit' }}
                    startIcon={page.icon}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <ProfileIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
