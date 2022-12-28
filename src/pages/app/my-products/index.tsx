import moment from 'moment';
import { Box, Stack, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ProductCard } from './components/product-card';
import { ProductDialog } from './components/product-dialog';
import { useMyProducts } from './hooks/useMyProducts';
import { useProductDialogStore } from './components/product-dialog/product-dialog.store';
import { useServerProfileStore } from './components/product-dialog/server-profile/server-profile.store';
import { MyProductsFilter } from './components/my-products.filter';
import { useMyProductsFilterStore } from './components/my-products.filter/store';
import { useAuth } from '@/hooks/useAuth';

export function convertExpiresIn(removeAt: string | null) {
  if (!removeAt) return 'NEVER';
  return moment(removeAt).fromNow().toUpperCase();
}

export function MyProducts() {
  const productDialogStore = useProductDialogStore();
  const serverProfileStore = useServerProfileStore();
  const myProductsFilterStore = useMyProductsFilterStore();
  const { hasRole } = useAuth();

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
            <>
              <Box sx={{ width: '100%' }}>
                <MyProductsFilter />
              </Box>
              {serverProfiles
                .filter(myProductsFilterStore.filter)
                .map((serverProfile) => (
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
                        ...(hasRole('admin')
                          ? [
                              {
                                key: 'OWNER USERNAME:',
                                value: serverProfile.owner?.username,
                              },
                              {
                                key: 'OWNER EMAIL:',
                                value: serverProfile.owner?.email,
                              },
                            ]
                          : []),
                      ]}
                      onClickEdit={() => {
                        productDialogStore.setProductName('Server Profile');
                        productDialogStore.setProductId(serverProfile.id);
                        productDialogStore.setMode('edit');
                        productDialogStore.setOpen(true);
                        serverProfileStore.setInitialFormData({
                          logoBlob: undefined,
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
                          logoBlob: undefined,
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
                ))}
            </>
          )}
        </Stack>
      </Stack>
      <ProductDialog />
    </>
  );
}
