import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const formattedPrice = `${product.price.toLocaleString('ru-RU')} руб.`;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {product.image && (
        <CardMedia
          component="img"
          height="180"
          image={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {formattedPrice}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Chip label={product.category} size="small" variant="outlined" />
          <Chip
            label={product.isAvailable ? 'В наличии' : 'Нет в наличии'}
            color={product.isAvailable ? 'success' : 'default'}
            size="small"
          />
          <Chip
            label={`Рейтинг ${product.rating}`}
            color="secondary"
            size="small"
            variant="outlined"
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button component={Link} to={`/catalog/${product.id}`} size="small" variant="outlined">
            Подробнее
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={!product.isAvailable}
            onClick={() => onAddToCart(product)}
          >
            {product.isAvailable ? 'Добавить' : 'Недоступно'}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
