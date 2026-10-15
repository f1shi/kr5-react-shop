function ProductCard({ product }) {
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
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">{formattedPrice}</p>
        <p className="product-card__rating">Рейтинг: {product.rating}</p>
        <p className="product-card__status">
          {product.isAvailable ? 'В наличии' : 'Нет в наличии'}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
