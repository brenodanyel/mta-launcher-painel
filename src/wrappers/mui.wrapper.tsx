import { ReactNode } from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#aaa',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});

type MUIWrapperProps = {
  children: ReactNode;
};

const globalStyles = (
  <GlobalStyles
    styles={{
      img: {
        maxWidth: '100%',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: '#ffffff',
      },
      '*::-webkit-scrollbar-thumb': {
        background: '#90caf9',
        borderRadius: '8px',
      },
    }}
  />
);

export function MUIWrapper(props: MUIWrapperProps) {
  const { children } = props;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </ThemeProvider>
  );
}
