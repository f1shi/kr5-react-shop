export function validateOrderForm(formData) {
  const errors = {};

  const name = formData.name.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const comment = formData.comment.trim();

  if (name.length < 2) {
    errors.name = 'Введите имя не короче 2 символов.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    errors.email = 'Введите корректный e-mail.';
  }

  const phonePattern = /^[0-9+\-()\s]+$/;

  if (phone.length < 6 || !phonePattern.test(phone)) {
    errors.phone = 'Введите корректный номер телефона.';
  }

  if (comment.length > 0 && comment.length < 10) {
    errors.comment = 'Комментарий должен содержать не менее 10 символов или быть пустым.';
  }

  return errors;
}
