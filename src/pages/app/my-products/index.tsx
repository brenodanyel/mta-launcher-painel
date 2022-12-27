import moment from 'moment';
import { Box, Stack, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ProductCard } from './product-card';
import { ProductDialog } from './product-dialog';
import { useMyProducts } from './hooks/useMyProducts';
import { useProductDialogStore } from './product-dialog/product-dialog.store';
import { useServerProfileStore } from './product-dialog/server-profile/server-profile.store';

export function convertExpiresIn(removeAt: string | null) {
  if (!removeAt) return 'NEVER';
  return moment(removeAt).fromNow().toUpperCase();
}

export function MyProducts() {
  const productDialogStore = useProductDialogStore();
  const serverProfileStore = useServerProfileStore();

  const { serverProfiles } = useMyProducts();

  return (
    <>
      <Stack gap='0.5em'>
        <Stack direction='row' alignItems='center' gap='0.5em'>
          <InventoryIcon />
          <Typography variant='h6'>My Products</Typography>
        </Stack>
        <Stack direction='row' flexWrap='wrap' gap='0.5em'>
          {serverProfiles.length === 0 ? (
            <Typography variant='body1' color='textSecondary'>
              You don&apos;t have any server profiles yet.
            </Typography>
          ) : (
            serverProfiles.map((serverProfile) => (
              <Box
                key={serverProfile.id}
                sx={{
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: { xs: '80vw', sm: '350px' },
                  overflow: 'hidden',
                }}
              >
                <ProductCard
                  productName='Server Profile'
                  productContent={[
                    {
                      key: 'EXPIRES IN:',
                      value: convertExpiresIn(serverProfile.removeAt),
                      tooltip: serverProfile.removeAt
                        ? moment(serverProfile.removeAt).toLocaleString()
                        : '',
                    },
                    {
                      key: 'SERVER:',
                      value:
                        serverProfile.ip && serverProfile.port
                          ? `mtasa://${serverProfile.ip}:${serverProfile.port}`
                          : 'N/A',
                    },
                  ]}
                  onClickEdit={() => {
                    productDialogStore.setProductName('Server Profile');
                    productDialogStore.setProductId(serverProfile.id);
                    productDialogStore.setMode('edit');
                    productDialogStore.setOpen(true);
                    serverProfileStore.setInitialFormData({
                      ip: serverProfile.ip,
                      port: String(serverProfile.port),
                      description: serverProfile.description,
                      logo: serverProfile.logo,
                      links: serverProfile.externalLinks,
                    });
                    serverProfileStore.resetFormData();
                  }}
                  onClickView={() => {
                    productDialogStore.setProductName('Server Profile');
                    productDialogStore.setProductId(serverProfile.id);
                    productDialogStore.setMode('view');
                    productDialogStore.setOpen(true);
                    serverProfileStore.setInitialFormData({
                      ip: serverProfile.ip,
                      port: String(serverProfile.port),
                      description: serverProfile.description,
                      logo: serverProfile.logo,
                      links: serverProfile.externalLinks,
                    });
                    serverProfileStore.resetFormData();
                  }}
                />
              </Box>
            ))
          )}
        </Stack>
      </Stack>
      <ProductDialog />
    </>
  );
}
