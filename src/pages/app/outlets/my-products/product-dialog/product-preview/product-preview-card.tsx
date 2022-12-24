import { Box, Button, Link, Paper, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDialogContext } from '../../product-dialog-context';
import MuiMarkdown from 'mui-markdown';

export function ProductPreviewCard() {
  const { formData } = useDialogContext();

  return (
    <Paper
      sx={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: { xs: '70vh', md: '70vh' },
        gap: '1em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5em',
          }}
        >
          <Box>
            <Typography variant='h6'>SERVER NAME HERE</Typography>
            <Typography variant='caption'>
              mtasa://{formData.ip || 'IP'}:{formData.port || 'PORT'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '0.5em',
            }}
          >
            {formData.links.map((link) => (
              <Link
                href={link.url}
                target='_blank'
                key={link.id}
                underline='none'
              >
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<ReplyIcon />}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: '128px',
            height: '128px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5em',
          }}
        >
          <img
            src={formData.logo || '/logo.png'}
            alt='Logo'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          overflow: 'auto',
          padding: '0.5em',
        }}
      >
        <MuiMarkdown
          options={{
            overrides: {
              a: { component: Link, props: { href: null } },
              h1: {
                component: Typography,
                props: { variant: 'h1', fontSize: '2.5em' },
              },
              h2: {
                component: Typography,
                props: { variant: 'h2', fontSize: '2em' },
              },
              h3: {
                component: Typography,
                props: { variant: 'h3', fontSize: '1.75em' },
              },
              h4: {
                component: Typography,
                props: { variant: 'h4', fontSize: '1.5em' },
              },
              h5: {
                component: Typography,
                props: { variant: 'h5', fontSize: '1.25em' },
              },
              h6: {
                component: Typography,
                props: { variant: 'h6', fontSize: '1em' },
              },
            },
          }}
        >
          {formData.description}
        </MuiMarkdown>
      </Box>
    </Paper>
  );
}
