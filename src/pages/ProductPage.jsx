import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productsApi';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

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
        <section className="product-page">
          <p className="status-message">Загрузка товара...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-main">
        <section className="product-page">
          <h2>Не удалось загрузить товар</h2>
          <p className="status-message status-message--error">{error}</p>
          <button className="button-link" type="button" onClick={handleRetry}>
            Попробовать снова
          </button>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="app-main">
        <section className="product-page">
          <h2>Товар не найден</h2>
          <p>Проверьте адрес страницы или вернитесь в каталог.</p>
          <Link className="button-link" to="/catalog">
            Вернуться в каталог
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="app-main">
      <section className="product-page">
        <Link className="back-link" to="/catalog">
          ← Назад в каталог
        </Link>

        <article className="product-details">
          {product.image && (
            <img
              className="product-details__image"
              src={`${import.meta.env.BASE_URL}${product.image}`}
              alt={product.title}
              width="640"
              height="480"
            />
          )}

          <div className="product-details__content">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Категория:</strong> {product.category}
            </p>
            <p>
              <strong>Цена:</strong> {product.price.toLocaleString('ru-RU')} руб.
            </p>
            <p>
              <strong>Рейтинг:</strong> {product.rating}
            </p>
            <p>
              <strong>Статус:</strong> {product.isAvailable ? 'В наличии' : 'Нет в наличии'}
            </p>
            <Link className="button-link" to="/order">
              Оставить заявку
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default ProductPage;
