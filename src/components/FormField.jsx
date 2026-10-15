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
  const errorId = `${fieldId}-error`;

  const commonProps = {
    id: fieldId,
    name,
    value,
    onChange,
    placeholder,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: error ? 'form-field__control form-field__control--error' : 'form-field__control'
  };

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={fieldId}>
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea {...commonProps} rows="4" />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && (
        <p className="form-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
