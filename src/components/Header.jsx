import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useThemeMode } from '../hooks/useThemeMode';

const visuallyHiddenSx = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap'
};

const navButtonSx = {
  '&.active': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
};

function Header() {
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', py: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h1">
            React Shop
          </Typography>
          <Typography variant="body2">
            Учебный интернет-магазин электроники на React
          </Typography>
        </Box>

        <Box component="nav" aria-label="Основная навигация" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button component={NavLink} to="/" end color="inherit" sx={navButtonSx}>
            Главная
          </Button>
          <Button component={NavLink} to="/catalog" color="inherit" sx={navButtonSx}>
            Каталог
          </Button>
          <Button component={NavLink} to="/order" color="inherit" sx={navButtonSx}>
            Заявка
          </Button>
          <Button
            component={NavLink}
            to="/cart"
            color="inherit"
            sx={navButtonSx}
            startIcon={
              <Badge badgeContent={totalCount} color="secondary" showZero>
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Корзина
            <Box component="span" sx={visuallyHiddenSx}>
              , товаров: {totalCount}
            </Box>
          </Button>
          <IconButton
            color="inherit"
            onClick={toggleMode}
            aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
            aria-pressed={isDark}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
