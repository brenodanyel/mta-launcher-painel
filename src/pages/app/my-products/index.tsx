import moment from 'moment';
import { Box, Stack, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ProductCard } from './product-card';
import { Product } from '@/types';
import { ProductDialog } from './product-dialog';
import { ProductDialogContextProvider } from './product-dialog-context';

const products: Product[] = [
  {
    id: 1,
    name: 'Server Profile',
    createdAt: '2022-11-30T00:00:00.000Z',
    removedAt: '2022-12-01T00:00:00.000Z',
    server: {
      ip: '192.168.0.1',
      port: 22003,
    },
    links: [{ id: 1, name: 'Website', url: 'https://google.com' }],
  },
  {
    id: 2,
    name: 'TOP List',
    createdAt: '2021-08-01T00:00:00.000Z',
    removedAt: '2022-12-01T00:00:00.000Z',
    server: {
      ip: '192.168.0.1',
      port: 22003,
    },
    links: [{ id: 1, name: 'Website', url: 'https://google.com' }],
  },
  {
    id: 3,
    name: 'TOP List',
    createdAt: '2021-08-01T00:00:00.000Z',
    removedAt: '2023-12-01T00:00:00.000Z',
    links: [{ id: 1, name: 'Website', url: 'https://google.com' }],
  },
  {
    id: 4,
    name: 'TOP List',
    createdAt: '2021-08-01T00:00:00.000Z',
    removedAt: '2023-12-01T00:00:00.000Z',
    links: [{ id: 1, name: 'Website', url: 'https://google.com' }],
  },
  {
    id: 5,
    name: 'TOP List',
    createdAt: '2021-08-01T00:00:00.000Z',
    removedAt: '2023-12-01T00:00:00.000Z',
    links: [{ id: 1, name: 'Website', url: 'https://google.com' }],
  },
];

export function getExpiresIn(product: Product) {
  const removeAt = moment(product.removedAt);
  const endDate = removeAt.add(30, 'days');
  return moment(endDate).fromNow().toUpperCase();
}

export function MyProducts() {
  return (
    <ProductDialogContextProvider>
      <Stack gap='0.5em'>
        <Stack direction='row' alignItems='center' gap='0.5em'>
          <InventoryIcon />
          <Typography variant='h6'>My Products</Typography>
        </Stack>
        <Stack direction='row' flexWrap='wrap' gap='0.5em'>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: { xs: '80vw', sm: '350px' },
                overflow: 'hidden',
              }}
            >
              <ProductCard product={product} />
            </Box>
          ))}
        </Stack>
      </Stack>
      <ProductDialog />
    </ProductDialogContextProvider>
  );
}
