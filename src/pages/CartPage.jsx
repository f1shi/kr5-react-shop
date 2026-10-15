import { useState } from 'react';
import { Alert, Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/priceUtils';

function CartPage() {
  const {
    items,
    totalCount,
    subtotal,
    promoCode,
    promoDiscount,
    total,
    changeQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode
  } = useCart();
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoResult, setPromoResult] = useState(null);

  function handlePromoSubmit(event) {
    event.preventDefault();
    setPromoResult(applyPromoCode(promoInput));
  }

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
          <Stack direction="row" justifyContent="space-between">
            <Typography>Сумма</Typography>
            <Typography>{formatPrice(subtotal)}</Typography>
          </Stack>
          {promoDiscount > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography>Промокод {promoCode}</Typography>
              <Typography color="success.main">−{formatPrice(promoDiscount)}</Typography>
            </Stack>
          )}
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700 }}>К оплате</Typography>
            <Typography sx={{ fontWeight: 700 }}>{formatPrice(total)}</Typography>
          </Stack>

          <Box component="form" onSubmit={handlePromoSubmit} noValidate sx={{ display: 'flex', gap: 1 }}>
            <TextField
              id="promo-code"
              label="Промокод"
              size="small"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              placeholder="STUDENT10"
              fullWidth
            />
            <Button type="submit" variant="outlined">
              Применить
            </Button>
          </Box>
          {promoResult && (
            <Alert severity={promoResult.ok ? 'success' : 'warning'} aria-live="polite">
              {promoResult.message}
            </Alert>
          )}
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
