import { Box, Button, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAllProducts } from './hooks/useAllProducts';
import { ProductCard } from './components/product-card';
import { ProductDialog } from './components/product-dialog';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '@/hooks/useAuth';
import { useProductsDialogStore } from './hooks/useProductsDialogStore';

export function AllProducts() {
  const { allProducts } = useAllProducts();
  const productsDialogStore = useProductsDialogStore();
  const { hasRole } = useAuth();

  return (
    <Stack gap='0.5em'>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5em',
          flexWrap: 'wrap',
        }}
      >
        <Stack direction='row' sx={{ alignItems: 'center', gap: '0.5em' }}>
          <ShoppingCartIcon />
          <Typography variant='h6' whiteSpace='nowrap'>
            All Products
          </Typography>
        </Stack>

        {hasRole('admin') && (
          <Button
            startIcon={<AddIcon />}
            onClick={() => {
              productsDialogStore.setFormData({
                name: '',
                price: '',
                advantages: [],
                active: true,
              });
              productsDialogStore.setProductId('');
              productsDialogStore.setAction('create');
              productsDialogStore.setOpen(true);
            }}
          >
            Create Product
          </Button>
        )}
      </Stack>
      <Stack direction='row' flexWrap='wrap' gap='0.5em'>
        {allProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '450px',
              overflow: 'hidden',
            }}
          >
            <ProductCard
              productId={product.id}
              productName={product.name}
              productPrice={product.price}
              productAdvantages={product.advantages}
              productActive={product.active}
            />
          </Box>
        ))}
      </Stack>
      <ProductDialog />
    </Stack>
  );
}
