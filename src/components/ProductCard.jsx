import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const formattedPrice = `${product.price.toLocaleString('ru-RU')} руб.`;

  return (
    <article className="product-card">
      {product.image && (
        <img
          className="product-card__image"
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.title}
          width="640"
          height="480"
          loading="lazy"
        />
      )}
      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/catalog/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">{formattedPrice}</p>
        <p className="product-card__rating">Рейтинг: {product.rating}</p>
        <p className="product-card__status">
          {product.isAvailable ? 'В наличии' : 'Нет в наличии'}
        </p>
        <div className="product-card__actions">
          <Link className="product-card__link" to={`/catalog/${product.id}`}>
            Подробнее
          </Link>
          <button
            className="product-card__button"
            type="button"
            disabled={!product.isAvailable}
            onClick={() => onAddToCart(product)}
          >
            {product.isAvailable ? 'Добавить' : 'Недоступно'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
