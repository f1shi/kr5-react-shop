import { useCallback, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createAppTheme } from '../theme/muiTheme';
import { ThemeModeContext } from './themeModeContext';

const THEME_STORAGE_KEY = 'kr5-react-shop-theme';

function ThemeModeProvider({ children }) {
  const [mode, setMode] = useLocalStorage(THEME_STORAGE_KEY, 'light');

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }, [setMode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default ThemeModeProvider;
