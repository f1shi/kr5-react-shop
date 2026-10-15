import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productsApi';
import { useCart } from '../hooks/useCart';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setIsLoading(true);
        setError('');

        const loadedProduct = await getProductById(productId, {
          signal: controller.signal
        });

        setProduct(loadedProduct);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Не удалось загрузить товар.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => {
      controller.abort();
    };
  }, [productId, reloadKey]);

  function handleRetry() {
    setReloadKey((prevKey) => prevKey + 1);
  }

  if (isLoading) {
    return (
      <main className="app-main">
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Загрузка товара...</Typography>
        </Box>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-main">
        <Stack spacing={2}>
          <Alert severity="error">Не удалось загрузить товар: {error}</Alert>
          <Button variant="contained" onClick={handleRetry}>
            Попробовать снова
          </Button>
        </Stack>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="app-main">
        <Paper elevation={2} sx={{ p: 4, display: 'grid', gap: 2 }}>
          <Typography variant="h4" component="h2">
            Товар не найден
          </Typography>
          <Typography color="text.secondary">
            Проверьте адрес страницы или вернитесь в каталог.
          </Typography>
          <Button component={Link} to="/catalog" variant="contained" sx={{ justifySelf: 'start' }}>
            Вернуться в каталог
          </Button>
        </Paper>
      </main>
    );
  }

  return (
    <main className="app-main">
      <Stack spacing={2}>
        <Button component={Link} to="/catalog" variant="text" sx={{ alignSelf: 'flex-start' }}>
          ← Назад в каталог
        </Button>

        <Card sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '360px 1fr' } }}>
          {product.image && (
            <CardMedia
              component="img"
              image={`${import.meta.env.BASE_URL}${product.image}`}
              alt={product.title}
              sx={{ height: { xs: 240, md: '100%' }, objectFit: 'cover' }}
            />
          )}

          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              {product.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
              <Chip label={product.category} variant="outlined" />
              <Chip
                label={product.isAvailable ? 'В наличии' : 'Нет в наличии'}
                color={product.isAvailable ? 'success' : 'default'}
              />
              <Chip label={`Рейтинг ${product.rating}`} color="secondary" variant="outlined" />
            </Stack>
            <Typography variant="h5" component="p" sx={{ mb: 2 }}>
              {product.price.toLocaleString('ru-RU')} руб.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                disabled={!product.isAvailable}
                onClick={() => {
                  addToCart(product);
                  setIsAdded(true);
                }}
              >
                {product.isAvailable ? 'В корзину' : 'Нет в наличии'}
              </Button>
              <Button component={Link} to="/order" variant="outlined">
                Оставить заявку
              </Button>
            </Stack>
            {isAdded && (
              <Alert severity="success" sx={{ mt: 2 }} aria-live="polite">
                Товар добавлен в корзину. <Link to="/cart">Перейти в корзину</Link>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Stack>
    </main>
  );
}

export default ProductPage;
