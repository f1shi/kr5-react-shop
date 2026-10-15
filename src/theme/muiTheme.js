import { createTheme } from '@mui/material/styles';

export function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#60a5fa' : '#2563eb'
      },
      secondary: {
        main: isDark ? '#c4b5fd' : '#7c3aed'
      },
      success: {
        main: isDark ? '#4ade80' : '#15803d'
      },
      warning: {
        main: '#d97706'
      },
      error: {
        main: isDark ? '#f87171' : '#b91c1c'
      },
      background: isDark
        ? { default: '#0f172a', paper: '#1e293b' }
        : { default: '#f8fafc', paper: '#ffffff' }
    },
    shape: {
      borderRadius: 10
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Arial, sans-serif'
    }
  });
}

export const muiTheme = createAppTheme('light');
