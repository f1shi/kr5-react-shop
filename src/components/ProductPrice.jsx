import { Box, Typography } from '@mui/material';
import { formatPrice, getFinalPrice } from '../utils/priceUtils';

function ProductPrice({ product, variant = 'h6' }) {
  const finalPrice = getFinalPrice(product);
  const hasDiscount = product.discountPercent > 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
      <Typography variant={variant} component="p" sx={{ m: 0 }}>
        {formatPrice(finalPrice)}
      </Typography>
      {hasDiscount && (
        <Typography
          component="s"
          variant="body2"
          color="text.secondary"
          aria-label={`Цена без скидки ${formatPrice(product.price)}`}
        >
          {formatPrice(product.price)}
        </Typography>
      )}
    </Box>
  );
}

export default ProductPrice;
