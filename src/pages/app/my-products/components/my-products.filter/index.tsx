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
  const { filters, setFilters } = useMyProductsFilterStore();
  const { hasRole } = useAuth();

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: '4px',
      }}
    >
      <AccordionSummary expandIcon={<Icon color='disabled'>expand_more</Icon>}>
        <Stack direction='row' sx={{ alignItems: 'center', gap: '0.5em' }}>
          <Icon>search</Icon>
          <Typography variant='h6'>
            Filters: {Object.values(filters).filter((v) => !!v).length || ''}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing='0.5em'>
          <Grid xs={12} sm={3}>
            <TextField
              label='Product ID'
              value={filters.id}
              onChange={(e) => {
                setFilters({ ...filters, id: e.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={5}>
            <TextField
              label='Server IP'
              value={filters.serverIP}
              onChange={(e) => {
                setFilters({ ...filters, serverIP: e.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              label='Server Port'
              value={filters.serverPort}
              onChange={(e) => {
                setFilters({ ...filters, serverPort: e.target.value });
              }}
            />
          </Grid>
          {hasRole('admin') && (
            <>
              <Grid xs={12} sm={6}>
                <TextField
                  label='Username'
                  value={filters.username}
                  onChange={(e) => {
                    setFilters({ ...filters, username: e.target.value });
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  label='Email'
                  value={filters.email}
                  onChange={(e) => {
                    setFilters({ ...filters, email: e.target.value });
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
