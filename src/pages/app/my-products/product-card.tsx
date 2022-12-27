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

type ProductCardProps = {
  productName: string;
  productContent: { key: string; value: string; tooltip?: string }[];
  onClickView: () => void;
  onClickEdit: () => void;
};

export function ProductCard(props: ProductCardProps) {
  const { productName, productContent, onClickEdit, onClickView } = props;

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        title={productName.toUpperCase()}
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
        {productContent.map((content) => (
          <Stack
            direction='row'
            justifyContent='space-between'
            gap='1em'
            flexWrap='wrap'
            key={content.key}
          >
            <Typography>{content.key}</Typography>
            <Tooltip title={content.tooltip} arrow>
              <Typography>{content.value}</Typography>
            </Tooltip>
          </Stack>
        ))}
      </CardContent>
      <Stack>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Tooltip title='Edit' arrow>
            <IconButton onClick={onClickEdit}>
              <EditIcon fontSize='large' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View' arrow>
            <IconButton onClick={onClickView}>
              <VisibilityIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Stack>
    </Card>
  );
}
