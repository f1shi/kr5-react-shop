import { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import FormField from '../components/FormField';
import { validateOrderForm } from '../utils/formValidation';

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

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid) {
      setFormStatus('warning');
      setFormMessage('Проверьте поля формы.');
      return;
    }

    console.table(formData);

    setFormStatus('success');
    setFormMessage('Заявка подготовлена. Данные выведены в консоль.');
    localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY);
    setFormData(initialFormData);
    setIsSubmitted(false);
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
            <Button variant="contained" type="submit">
              Отправить заявку
            </Button>
            <Button variant="outlined" type="button" onClick={handleReset}>
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
