import { Fab, Link, Tooltip, Icon } from '@mui/material';

export function HelpIcon() {
  return (
    <Link
      href='https://discord.com/invite/xxxxxx'
      target='_blank'
      color='inherit'
      sx={{
        position: 'fixed',
        right: '1em',
        bottom: '1em',
      }}
    >
      <Tooltip title='Support'>
        <Fab variant='circular' color='primary'>
          <Icon>question_mark</Icon>
        </Fab>
      </Tooltip>
    </Link>
  );
}
