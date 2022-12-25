import { Product } from '@/types';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Link,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import { getExpiresIn } from '.';
import { useDialogContext } from './product-dialog-context';

type ProductCardProps = {
  product: Product;
};

export function ProductCard(props: ProductCardProps) {
  const { setDialogState } = useDialogContext();
  const { product } = props;

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        title={product.name.toUpperCase()}
        subheader={
          <Link
            component={RouterLink}
            to='#'
            underline='hover'
            sx={{
              color: 'text.disabled',
            }}
          >
            ADD +30 DAYS
          </Link>
        }
      />
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          gap='1em'
          flexWrap='wrap'
        >
          <Typography>SERVER:</Typography>
          <Typography>
            {product.server
              ? `${product.server?.ip}:${product.server.port}`
              : 'NONE'}
          </Typography>
        </Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          gap='1em'
          flexWrap='wrap'
        >
          <Typography>EXPIRES:</Typography>
          <Tooltip title={moment(product.removedAt).toLocaleString()} arrow>
            <Typography>{getExpiresIn(product)}</Typography>
          </Tooltip>
        </Stack>
      </CardContent>
      <Stack>
        <CardActions sx={{ justifyContent: 'center' }}>
          <IconButton
            onClick={() => {
              setDialogState({
                mode: 'edit',
                product,
              });
            }}
          >
            <EditIcon fontSize='large' />
          </IconButton>
          <IconButton
            onClick={() => {
              setDialogState({
                mode: 'view',
                product,
              });
            }}
          >
            <VisibilityIcon fontSize='large' />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
}
