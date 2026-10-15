export const CATEGORIES = [
  { value: 'smartphones', label: 'Смартфоны' },
  { value: 'laptops', label: 'Ноутбуки' },
  { value: 'headphones', label: 'Наушники' },
  { value: 'accessories', label: 'Аксессуары' }
];

export function getCategoryLabel(value) {
  const category = CATEGORIES.find((item) => item.value === value);
  return category ? category.label : value;
}
