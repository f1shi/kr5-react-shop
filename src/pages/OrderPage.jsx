import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { createOrder } from '../api/ordersApi';
import FormField from '../components/FormField';
import { useCart } from '../hooks/useCart';
import { validateOrderForm } from '../utils/formValidation';
import { formatPrice, getFinalPrice } from '../utils/priceUtils';

const ORDER_DRAFT_STORAGE_KEY = 'kr5-react-shop-order-draft';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  comment: ''
};

function OrderPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState('warning');
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { items, total, promoCode, clearCart } = useCart();

  useEffect(() => {
    const savedDraft = localStorage.getItem(ORDER_DRAFT_STORAGE_KEY);

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);

        setFormData({
          ...initialFormData,
          ...parsedDraft
        });
      } catch {
        localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY);
      }
    }

    setIsDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!isDraftLoaded) {
      return;
    }

    const hasDraftData = Object.values(formData).some((value) => value.trim() !== '');

    if (!hasDraftData) {
      localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY);
      return;
    }

    localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(formData));
  }, [formData, isDraftLoaded]);

  const errors = validateOrderForm(formData);
  const isFormValid = Object.keys(errors).length === 0;

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    setFormMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid) {
      setFormStatus('warning');
      setFormMessage('Проверьте поля формы.');
      return;
    }

    const orderData = {
      customer: formData,
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: getFinalPrice(item.product)
      })),
      promoCode,
      total
    };

    try {
      setIsSending(true);
      setFormStatus('info');
      setFormMessage('Отправляем заявку...');

      const createdOrder = await createOrder(orderData);

      console.table(createdOrder.items);

      setFormStatus('success');
      setFormMessage(`Заявка №${createdOrder.id} отправлена. Менеджер свяжется с вами.`);
      localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY);
      setFormData(initialFormData);
      setIsSubmitted(false);
      clearCart();
    } catch {
      setFormStatus('error');
      setFormMessage('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSending(false);
    }
  }

  function handleReset() {
    setFormData(initialFormData);
    setFormMessage('');
    setIsSubmitted(false);
    localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY);
  }

  return (
    <main className="app-main">
      <Paper component="section" elevation={2} sx={{ p: 3, display: 'grid', gap: 3 }}>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Заявка на консультацию
          </Typography>
          <Typography color="text.secondary">
            Заполните форму. Данные сохраняются как черновик в браузере.
          </Typography>
        </Box>

        {items.length > 0 && (
          <Box component="section" aria-labelledby="order-cart-title">
            <Typography id="order-cart-title" variant="h6" component="h3">
              Товары в заявке
            </Typography>
            <List dense>
              {items.map((item) => (
                <ListItem key={item.product.id} disableGutters>
                  <ListItemText
                    primary={`${item.product.title} × ${item.quantity}`}
                    secondary={formatPrice(getFinalPrice(item.product) * item.quantity)}
                  />
                </ListItem>
              ))}
            </List>
            <Typography sx={{ fontWeight: 700 }}>
              Итого: {formatPrice(total)}
              {promoCode && ` (с промокодом ${promoCode})`}
            </Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 2 }}>
          <FormField
            label="Имя"
            name="name"
            value={formData.name}
            error={isSubmitted ? errors.name : ''}
            onChange={handleFieldChange}
            placeholder="Введите имя"
          />

          <FormField
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            error={isSubmitted ? errors.email : ''}
            onChange={handleFieldChange}
            placeholder="example@mail.ru"
          />

          <FormField
            label="Телефон"
            name="phone"
            type="tel"
            value={formData.phone}
            error={isSubmitted ? errors.phone : ''}
            onChange={handleFieldChange}
            placeholder="+7 999 000-00-00"
          />

          <FormField
            label="Комментарий"
            name="comment"
            value={formData.comment}
            error={isSubmitted ? errors.comment : ''}
            onChange={handleFieldChange}
            placeholder="Кратко опишите задачу"
            as="textarea"
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSending}
              startIcon={isSending ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isSending ? 'Отправка...' : 'Отправить заявку'}
            </Button>
            <Button variant="outlined" type="button" onClick={handleReset} disabled={isSending}>
              Очистить черновик
            </Button>
          </Stack>

          {formMessage && (
            <Alert severity={formStatus} aria-live="polite">
              {formMessage}
            </Alert>
          )}
        </Box>
      </Paper>
    </main>
  );
}

export default OrderPage;
