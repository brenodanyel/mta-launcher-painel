import { Box, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAllProducts } from './hooks/useAllProducts';
import { ProductCard } from './components/product-card';
import { ProductDialog } from './components/product-dialog';

export function AllProducts() {
  const { allProducts } = useAllProducts();

  return (
    <Stack gap='0.5em'>
      <Stack direction='row' alignItems='center' gap='0.5em'>
        <ShoppingCartIcon />
        <Typography variant='h6'>All Products</Typography>
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
