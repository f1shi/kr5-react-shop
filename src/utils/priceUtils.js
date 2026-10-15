export function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

export function getFinalPrice(product) {
  const discountPercent = product.discountPercent || 0;
  return Math.round(product.price * (100 - discountPercent) / 100);
}
