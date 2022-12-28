import { Paper, Stack, Typography, Button, Icon } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useAuth } from '@/hooks/useAuth';
import { ProductCardAdminActions } from './product-card.admin-actions';
import { useProductsDialogStore } from '../../hooks/useProductsDialogStore';
import { useAllProducts } from '../../hooks/useAllProducts';

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
  const { deleteProduct } = useAllProducts();
  const { hasRole } = useAuth();
  const confirm = useConfirm();
  const productsDialogStore = useProductsDialogStore();
  const {
    productId,
    productName,
    productPrice,
    productAdvantages,
    productActive,
  } = props;

  async function handleDelete() {
    const key =
      'yes, delete ' +
      productName.toLowerCase().replaceAll(/\s/g, '-') +
      '-' +
      Math.ceil(Math.random() * 10000).toString();

    await confirm({
      title: `Delete '${productName}'?`,
      titleProps: {
        textAlign: 'center',
      },
      confirmationText: 'Delete',
      dialogProps: {
        maxWidth: 'xs',
        PaperProps: { elevation: 0, variant: 'outlined' },
      },
      content: (
        <Stack sx={{ textAlign: 'center', gap: '0.5em', mb: '0.5em' }}>
          <Typography>Are you sure you want to delete this product?</Typography>
          <Typography fontSize='0.8em'>
            Note that this action cannot be undone!
          </Typography>
          <Typography fontSize='0.8em'>
            {`Please type "${key}" to confirm.`}
          </Typography>
        </Stack>
      ),
      confirmationKeyword: key,
      cancellationButtonProps: {
        color: 'error',
      },
    })
      .then(() => deleteProduct(productId))
      .catch(() => console.log('deletion canceled'));
  }

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
            <Button startIcon={<Icon>shopping_cart</Icon>}>BUY</Button>
          ) : (
            <Button startIcon={<Icon>error</Icon>} disabled>
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
            productsDialogStore.setFormData({
              name: productName,
              price: String(productPrice),
              advantages: productAdvantages,
              active: productActive,
            });
            productsDialogStore.setProductId(productId);
            productsDialogStore.setAction('edit');
            productsDialogStore.setOpen(true);
          }}
          onClickDelete={() => {
            handleDelete();
          }}
        />
      )}
    </Paper>
  );
}
