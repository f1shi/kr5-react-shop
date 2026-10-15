import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';

function ProductPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));

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
