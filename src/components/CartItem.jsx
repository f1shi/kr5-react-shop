import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatPrice, getFinalPrice } from '../utils/priceUtils';

function CartItem({ item, onChangeQuantity, onRemove }) {
  const { product, quantity } = item;
  const unitPrice = getFinalPrice(product);

  return (
    <Paper
      component="li"
      variant="outlined"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '80px 1fr', sm: '96px 1fr auto auto' },
        alignItems: 'center',
        gap: 2,
        p: 2
      }}
    >
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}${product.image}`}
        alt=""
        sx={{ width: '100%', borderRadius: 1 }}
      />

      <Box>
        <Typography component={Link} to={`/catalog/${product.id}`} variant="subtitle1" sx={{ color: 'text.primary' }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatPrice(unitPrice)} за шт.
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton
          aria-label={`Уменьшить количество: ${product.title}`}
          onClick={() => onChangeQuantity(product.id, -1)}
        >
          <RemoveIcon />
        </IconButton>
        <Typography component="span" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
          {quantity}
        </Typography>
        <IconButton
          aria-label={`Увеличить количество: ${product.title}`}
          onClick={() => onChangeQuantity(product.id, 1)}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifySelf: { sm: 'end' } }}>
        <Typography sx={{ fontWeight: 700 }}>{formatPrice(unitPrice * quantity)}</Typography>
        <IconButton
          color="error"
          aria-label={`Удалить из корзины: ${product.title}`}
          onClick={() => onRemove(product.id)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default CartItem;
