export function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return products;
  }

  return products.filter((product) =>
    product.title.toLowerCase().includes(normalizedQuery)
  );
}

export function filterProductsByCategory(products, category) {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function sortProducts(products, sortType) {
  const productsCopy = [...products];

  if (sortType === 'price-asc') {
    return productsCopy.sort((a, b) => a.price - b.price);
  }

  if (sortType === 'price-desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }

  if (sortType === 'title-asc') {
    return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
  }

  return productsCopy;
}

export function getPreparedProducts(products, query, category, sortType) {
  let result = [...products];

  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  result = sortProducts(result, sortType);

  return result;
}
