import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CATEGORIES } from '../utils/categories';

function CatalogControls({
  searchQuery,
  selectedCategory,
  sortType,
  onSearchChange,
  onCategoryChange,
  onSortChange
}) {
  return (
    <Box
      component="section"
      aria-label="Управление каталогом"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, 1fr)'
        },
        gap: 2,
        mb: 3
      }}
    >
      <TextField
        id="catalog-search"
        label="Поиск товара"
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Введите название товара"
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="category-filter-label">Категория</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={selectedCategory}
          label="Категория"
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <MenuItem value="all">Все категории</MenuItem>
          {CATEGORIES.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="sort-select-label">Сортировка</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortType}
          label="Сортировка"
          onChange={(event) => onSortChange(event.target.value)}
        >
          <MenuItem value="default">По умолчанию</MenuItem>
          <MenuItem value="price-asc">Сначала дешевле</MenuItem>
          <MenuItem value="price-desc">Сначала дороже</MenuItem>
          <MenuItem value="title-asc">По названию А-Я</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CatalogControls;
