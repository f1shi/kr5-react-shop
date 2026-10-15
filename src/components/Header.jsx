import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navButtonSx = {
  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.18)'
  }
};

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', py: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h1">
            React Shop
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
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
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Корзина
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
