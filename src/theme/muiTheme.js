import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb'
    },
    secondary: {
      main: '#7c3aed'
    },
    success: {
      main: '#15803d'
    },
    warning: {
      main: '#d97706'
    },
    error: {
      main: '#b91c1c'
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Arial, sans-serif'
  }
});
