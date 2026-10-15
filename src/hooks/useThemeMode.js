import { useContext } from 'react';
import { ThemeModeContext } from '../context/themeModeContext';

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode должен использоваться внутри ThemeModeProvider');
  }

  return context;
}
