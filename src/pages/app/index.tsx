import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Fade } from '@mui/material';
import { Header } from '@/components/header';
import { HelpIcon } from './help-icon';

export function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Container maxWidth='xl' key={pathname}>
        <Fade in>
          <Box sx={{ paddingY: '1em' }}>
            <Outlet />
          </Box>
        </Fade>
      </Container>
      <HelpIcon />
    </>
  );
}
