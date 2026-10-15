import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <p className="products-empty">
        По выбранным условиям товары не найдены.
      </p>
    );
  }

  return (
    <section className="products-section" aria-labelledby="products-title">
      <h2 id="products-title">Каталог товаров</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
