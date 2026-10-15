import { TextField } from '@mui/material';

function FormField({
  label,
  name,
  type = 'text',
  value,
  error,
  onChange,
  placeholder = '',
  as = 'input'
}) {
  const fieldId = `order-${name}`;

  return (
    <TextField
      id={fieldId}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={error || ' '}
      fullWidth
      multiline={as === 'textarea'}
      rows={as === 'textarea' ? 4 : undefined}
    />
  );
}

export default FormField;
