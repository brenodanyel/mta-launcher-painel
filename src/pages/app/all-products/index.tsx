import { Box, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAllProducts } from './hooks/useAllProducts';
import { ProductCard } from './components/product-card';

export function AllProducts() {
  const { allProducts } = useAllProducts();

  return (
    <Stack gap='0.5em'>
      <Stack direction='row' alignItems='center' gap='0.5em'>
        <ShoppingCartIcon />
        <Typography variant='h6'>All Products</Typography>
      </Stack>
      <Stack
        direction='row'
        sx={{
          flexWrap: 'wrap',
          gap: '0.5em',
          // justifyContent: 'center',
        }}
      >
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
              productName={product.name}
              productPrice={product.price}
              productAdvantages={product.advantages}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
