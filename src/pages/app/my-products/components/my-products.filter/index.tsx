import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Unstable_Grid2 as Grid,
  Icon,
  TextField,
  Stack,
} from '@mui/material';
import { useMyProductsFilterStore } from './store';
import { useAuth } from '@/hooks/useAuth';

export function MyProductsFilter() {
  const myProductsFilterStore = useMyProductsFilterStore();
  const { hasRole } = useAuth();

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: '4px',
      }}
    >
      <AccordionSummary expandIcon={<Icon color='disabled'>expand_more</Icon>}>
        <Stack direction='row' gap='0.5em'>
          <Icon>search</Icon>
          <Typography>Filters: </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing='0.5em'>
          <Grid xs={12} sm={8}>
            <TextField
              label='Server IP'
              value={myProductsFilterStore.serverIP}
              onChange={(e) => {
                myProductsFilterStore.setServerIP(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              label='Server Port'
              value={myProductsFilterStore.serverPort}
              onChange={(e) => {
                myProductsFilterStore.setServerPort(e.target.value);
              }}
            />
          </Grid>
          {hasRole('admin') && (
            <>
              <Grid xs={12} sm={6}>
                <TextField
                  label='Username'
                  value={myProductsFilterStore.username}
                  onChange={(e) => {
                    myProductsFilterStore.setUsername(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  label='Email'
                  value={myProductsFilterStore.email}
                  onChange={(e) => {
                    myProductsFilterStore.setEmail(e.target.value);
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
