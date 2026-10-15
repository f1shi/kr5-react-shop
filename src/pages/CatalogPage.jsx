import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { getProducts } from '../api/productsApi';
import CatalogControls from '../components/CatalogControls';
import ProductList from '../components/ProductList';
import { getPreparedProducts } from '../utils/productUtils';

const ADDED_COUNT_STORAGE_KEY = 'kr5-react-shop-added-count';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [addedCount, setAddedCount] = useState(() => {
    const savedCount = localStorage.getItem(ADDED_COUNT_STORAGE_KEY);

    if (!savedCount) {
      return 0;
    }

    return Number(savedCount) || 0;
  });

  useEffect(() => {
    localStorage.setItem(ADDED_COUNT_STORAGE_KEY, String(addedCount));
  }, [addedCount]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError('');

        const loadedProducts = await getProducts({
          signal: controller.signal
        });

        setProducts(loadedProducts);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Не удалось загрузить товары.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  function handleRetry() {
    setReloadKey((prevKey) => prevKey + 1);
  }

  function handleAddToCart(product) {
    console.log(`Товар добавлен: ${product.title}`);
    setAddedCount((prevCount) => prevCount + 1);
  }

  const visibleProducts = getPreparedProducts(
    products,
    searchQuery,
    selectedCategory,
    sortType
  );

  if (isLoading) {
    return (
      <main className="app-main">
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Загрузка товаров...</Typography>
        </Box>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-main">
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Alert severity="error">Не удалось загрузить каталог: {error}</Alert>
          <Button variant="contained" type="button" onClick={handleRetry}>
            Попробовать снова
          </Button>
        </Box>
      </main>
    );
  }

  return (
    <main className="app-main">
      <section className="catalog-page">
        <Box className="catalog-page__header">
          <Typography variant="h4" component="h2">
            Каталог товаров
          </Typography>
          <Typography>
            Найдено товаров: <strong>{visibleProducts.length}</strong>
          </Typography>
          <Typography>
            Добавлено товаров: <strong>{addedCount}</strong>
          </Typography>
        </Box>

        <CatalogControls
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortType={sortType}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortType}
        />

        <ProductList
          products={visibleProducts}
          onAddToCart={handleAddToCart}
        />
      </section>
    </main>
  );
}

export default CatalogPage;
