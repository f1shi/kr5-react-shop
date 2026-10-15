const PRODUCTS_URL = `${import.meta.env.BASE_URL}products.json`;

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getProducts(options = {}) {
  return requestJson(PRODUCTS_URL, options);
}

export async function getProductById(productId, options = {}) {
  const products = await getProducts(options);
  const numericProductId = Number(productId);

  return products.find((product) => product.id === numericProductId) || null;
}
