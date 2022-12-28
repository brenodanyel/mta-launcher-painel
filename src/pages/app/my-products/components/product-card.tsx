import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fragment } from 'react';

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
      <CardHeader title={productName.toUpperCase()} />
      <CardContent>
        {productContent.map((content) => (
          <Fragment key={content.key}>
            <Stack
              direction='row'
              justifyContent='space-between'
              gap='1em'
              flexWrap='wrap'
            >
              <Typography fontSize='0.85em'>{content.key}</Typography>
              <Tooltip title={content.tooltip} arrow>
                <Typography fontSize='0.85em'>{content.value}</Typography>
              </Tooltip>
            </Stack>
          </Fragment>
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
