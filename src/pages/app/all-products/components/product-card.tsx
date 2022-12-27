import { Paper, Stack, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type ProductCardProps = {
  productName: string;
  productPrice: number;
  productAdvantages: {
    id: string;
    description: string;
  }[];
};

export function ProductCard(props: ProductCardProps) {
  const { productName, productPrice, productAdvantages } = props;

  return (
    <Paper sx={{ borderRadius: '0.5em' }}>
      <Paper elevation={3}>
        <Stack
          direction='column'
          sx={{ padding: '3em', alignItems: 'center' }}
          spacing='0.5em'
        >
          <Typography
            variant='h3'
            sx={{
              fontSize: '1.5em',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {productName.toUpperCase()}
          </Typography>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography
              variant='h5'
              sx={{
                fontSize: '1.2em',
                textAlign: 'center',
              }}
            >
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(productPrice)}
            </Typography>
            <Typography variant='caption'>/MONTH</Typography>
          </Stack>
          <Button startIcon={<ShoppingCartIcon />}>BUY</Button>
        </Stack>
      </Paper>
      {productAdvantages.length > 0 && (
        <Stack sx={{ padding: '1em' }}>
          {productAdvantages.map((advantage) => (
            <Stack
              key={advantage.id}
              direction='row'
              spacing='0.5em'
              justifyContent='flex-start'
            >
              <Typography>•</Typography>
              <Typography> {advantage.description}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
