import { Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
  {
    name: 'SERVER PROFILE',
    price: '$10 USD',
    paymentUrl: 'https://www.paypal.com/paypalme/mtasa',
    advantages: [
      'ADD A INFO BADGE TO YOUR SERVER ON THE LIST',
      'YOU WILL BE ABLE TO ADD A CUSTOM ICON TO YOUR SERVER',
    ],
  },
  {
    name: 'TOP LIST',
    price: '$20 USD',
    paymentUrl: 'https://www.paypal.com/paypalme/mtasa',
    advantages: [
      'YOUR SERVER WILL BE SHOWN ON TOP OF THE LIST (only if the serverlist is unsorted) ',
      'YOUR SERVER WILL BE DISPLAYED IN A DIFFERENT COLOR',
    ],
  },
];

export function AllProducts() {
  return (
    <Stack gap='0.5em'>
      <Stack direction='row' alignItems='center' gap='0.5em'>
        <ShoppingCartIcon />
        <Typography variant='h6'>All Products</Typography>
      </Stack>
      <Stack direction='row' flexWrap='wrap' gap='0.5em'>
        <Typography>There are no products available.</Typography>
      </Stack>
    </Stack>
  );
}
