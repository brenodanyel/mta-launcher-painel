import moment from 'moment';
import { Box, Icon, Stack, Typography } from '@mui/material';
import { ProductCard } from './components/product-card';
import { ProductDialog } from './components/product-dialog';
import { useMyProducts } from './hooks/useMyProducts';
import { useProductDialogStore } from './components/product-dialog/product-dialog.store';
import { useServerProfileStore } from './components/product-dialog/server-profile/server-profile.store';
import { MyProductsFilter } from './components/my-products.filter';
import { useMyProductsFilterStore } from './components/my-products.filter/store';
import { useAuth } from '@/hooks/useAuth';
import Button from '@mui/material/Button';

export function convertExpiresIn(removeAt: Date | null) {
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
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Stack direction='row' sx={{ alignItems: 'center', gap: '0.5em' }}>
            <Icon>inventory</Icon>
            <Typography variant='h6' whiteSpace='nowrap'>
              My Products
            </Typography>
          </Stack>
          {hasRole('admin') && (
            <Button
              startIcon={<Icon>add</Icon>}
              onClick={() => {
                productDialogStore.setProductName('Server Profile');
                productDialogStore.setProductId('');
                productDialogStore.setMode('create');
                productDialogStore.setOpen(true);
                serverProfileStore.setInitialFormData({
                  logoBlob: undefined,
                  ip: '',
                  port: '',
                  description: '',
                  logo: '',
                  links: [],
                  ownerId: undefined,
                  removeAt: null,
                });
                serverProfileStore.resetFormData();
              }}
            >
              Create
            </Button>
          )}
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
                      productId={serverProfile.id}
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
                            { key: '-'.repeat(20), value: '-'.repeat(20) },
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
                          ownerId: serverProfile.ownerId,
                          removeAt: serverProfile.removeAt,
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
                          ownerId: serverProfile.ownerId,
                          removeAt: serverProfile.removeAt,
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
