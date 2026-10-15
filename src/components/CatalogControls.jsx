function CatalogControls({
  searchQuery,
  selectedCategory,
  sortType,
  onSearchChange,
  onCategoryChange,
  onSortChange
}) {
  return (
    <section className="catalog-controls" aria-label="Управление каталогом">
      <div className="catalog-controls__group">
        <label htmlFor="catalog-search">Поиск товара</label>
        <input
          id="catalog-search"
          className="catalog-controls__input"
          type="search"
          placeholder="Введите название товара"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="catalog-controls__group">
        <label htmlFor="category-filter">Категория</label>
        <select
          id="category-filter"
          className="catalog-controls__select"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="smartphones">Смартфоны</option>
          <option value="laptops">Ноутбуки</option>
          <option value="headphones">Наушники</option>
          <option value="accessories">Аксессуары</option>
        </select>
      </div>

      <div className="catalog-controls__group">
        <label htmlFor="sort-select">Сортировка</label>
        <select
          id="sort-select"
          className="catalog-controls__select"
          value={sortType}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="title-asc">По названию А-Я</option>
        </select>
      </div>
    </section>
  );
}

export default CatalogControls;
