import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  Link,
  Icon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
    <Fade in>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardHeader
          title={productName.toUpperCase()}
          subheader={
            <Link
              component={RouterLink}
              to='#'
              color='success.dark'
              underline='hover'
              variant='caption'
            >
              ADD + 30 DAYS
            </Link>
          }
        />
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
                <Icon fontSize='large'>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='View' arrow>
              <IconButton onClick={onClickView}>
                <Icon fontSize='large'>visibility</Icon>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Stack>
      </Card>
    </Fade>
  );
}
