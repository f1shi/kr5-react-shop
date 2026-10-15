import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Box, Button, Pagination, Typography } from '@mui/material';
import { getProducts } from '../api/productsApi';
import CatalogControls from '../components/CatalogControls';
import { useCart } from '../hooks/useCart';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductList from '../components/ProductList';
import { getPreparedProducts } from '../utils/productUtils';

const PRODUCTS_PER_PAGE = 6;

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'all');
  const [sortType, setSortType] = useState(() => searchParams.get('sort') || 'default');
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (searchQuery) {
      nextParams.set('q', searchQuery);
    }

    if (selectedCategory !== 'all') {
      nextParams.set('category', selectedCategory);
    }

    if (sortType !== 'default') {
      nextParams.set('sort', sortType);
    }

    if (page > 1) {
      nextParams.set('page', String(page));
    }

    setSearchParams(nextParams, { replace: true });
  }, [searchQuery, selectedCategory, sortType, page, setSearchParams]);
  const { totalCount, addToCart } = useCart();
  const [addedMessage, setAddedMessage] = useState('');

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
    addToCart(product);
    setAddedMessage(`Товар «${product.title}» добавлен в корзину.`);
  }

  const visibleProducts = getPreparedProducts(
    products,
    searchQuery,
    selectedCategory,
    sortType
  );

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageProducts = visibleProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  function updateFilter(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  if (isLoading) {
    return (
      <main className="app-main">
        <Typography role="status" sx={{ mb: 2 }}>
          Загрузка товаров...
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 3
          }}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
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
            Товаров в корзине: <strong>{totalCount}</strong>
          </Typography>
        </Box>

        {addedMessage && (
          <Alert severity="success" aria-live="polite" onClose={() => setAddedMessage('')}>
            {addedMessage}
          </Alert>
        )}

        <CatalogControls
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortType={sortType}
          onSearchChange={updateFilter(setSearchQuery)}
          onCategoryChange={updateFilter(setSelectedCategory)}
          onSortChange={updateFilter(setSortType)}
        />

        <ProductList
          products={pageProducts}
          onAddToCart={handleAddToCart}
        />

        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center' }}
            getItemAriaLabel={(type, itemPage) =>
              type === 'page' ? `Страница ${itemPage}` : type === 'next' ? 'Следующая страница' : 'Предыдущая страница'
            }
          />
        )}
      </section>
    </main>
  );
}

export default CatalogPage;
