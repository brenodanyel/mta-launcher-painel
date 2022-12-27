import { Paper, Stack, Typography, Button } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { ProductCardAdminActions } from './product-card.admin-actions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useProductsDialogStore } from '../../hooks/useProductsDialogStore';

type ProductCardProps = {
  productId: string;
  productName: string;
  productPrice: number;
  productAdvantages: {
    id: string;
    description: string;
  }[];
  productActive: boolean;
};

export function ProductCard(props: ProductCardProps) {
  const { hasRole } = useAuth();
  const { setFormData, setOpen, setProductId } = useProductsDialogStore();
  const {
    productId,
    productName,
    productPrice,
    productAdvantages,
    productActive,
  } = props;

  return (
    <Paper sx={{ borderRadius: '0.5em', position: 'relative' }}>
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
          {productActive ? (
            <Button startIcon={<ShoppingCartIcon />}>BUY</Button>
          ) : (
            <Button startIcon={<ErrorIcon />} disabled>
              UNAVAILABLE
            </Button>
          )}
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
      {hasRole('admin') && (
        <ProductCardAdminActions
          onClickEdit={() => {
            setFormData({
              name: productName,
              price: String(productPrice),
              advantages: productAdvantages,
              active: productActive,
            });
            setProductId(productId);
            setOpen(true);
          }}
        />
      )}
    </Paper>
  );
}
