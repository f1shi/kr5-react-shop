import { Alert, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/priceUtils';

function CartPage() {
  const { items, totalCount, subtotal, changeQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="app-main">
        <Paper elevation={2} sx={{ p: 4, display: 'grid', gap: 2 }}>
          <Typography variant="h4" component="h2">
            Корзина
          </Typography>
          <Alert severity="info">Корзина пуста. Добавьте товары из каталога.</Alert>
          <Button component={Link} to="/catalog" variant="contained" sx={{ justifySelf: 'start' }}>
            Перейти в каталог
          </Button>
        </Paper>
      </main>
    );
  }

  return (
    <main className="app-main">
      <Typography variant="h4" component="h2" gutterBottom>
        Корзина
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 320px' },
          gap: 3,
          alignItems: 'start'
        }}
      >
        <Stack component="ul" spacing={2} sx={{ m: 0, p: 0, listStyle: 'none' }}>
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onChangeQuantity={changeQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </Stack>

        <Paper component="aside" elevation={2} sx={{ p: 3, display: 'grid', gap: 2 }}>
          <Typography variant="h6" component="h3">
            Итого
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Товаров</Typography>
            <Typography>{totalCount}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700 }}>К оплате</Typography>
            <Typography sx={{ fontWeight: 700 }}>{formatPrice(subtotal)}</Typography>
          </Stack>
          <Button component={Link} to="/order" variant="contained">
            Оформить заказ
          </Button>
          <Button variant="outlined" color="error" onClick={clearCart}>
            Очистить корзину
          </Button>
        </Paper>
      </Box>
    </main>
  );
}

export default CartPage;
