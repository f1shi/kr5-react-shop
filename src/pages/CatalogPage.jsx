import { useState } from 'react';
import CatalogControls from '../components/CatalogControls';
import ProductList from '../components/ProductList';
import { products } from '../data/products';
import { getPreparedProducts } from '../utils/productUtils';

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [addedCount, setAddedCount] = useState(0);

  const visibleProducts = getPreparedProducts(
    products,
    searchQuery,
    selectedCategory,
    sortType
  );

  function handleAddToCart(product) {
    console.log(`Товар добавлен: ${product.title}`);
    setAddedCount((prevCount) => prevCount + 1);
  }

  return (
    <main className="app-main">
      <section className="catalog-page">
        <div className="catalog-page__header">
          <h2>Каталог товаров</h2>
          <p>
            Найдено товаров: <strong>{visibleProducts.length}</strong>
          </p>
          <p>
            Добавлено товаров: <strong>{addedCount}</strong>
          </p>
        </div>

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
