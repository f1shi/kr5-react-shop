import { Alert, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CartPage() {
  return (
    <main className="app-main">
      <Paper elevation={2} sx={{ p: 4, display: 'grid', gap: 2 }}>
        <Typography variant="h4" component="h2">
          Корзина
        </Typography>
        <Alert severity="info">
          На данном этапе корзина является заготовкой. Полноценная логика корзины будет реализована как самостоятельная доработка КР №5.
        </Alert>
        <Button component={Link} to="/catalog" variant="contained" sx={{ justifySelf: 'start' }}>
          Вернуться в каталог
        </Button>
      </Paper>
    </main>
  );
}

export default CartPage;
