import './FormField.less';

export default function FormField({
  id,
  label,
  error,
  required,
  children,
  hint,
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
      
      <div className="form-field__control-wrapper">
        {typeof children === 'function'
          ? children({ id, describedBy, 'aria-invalid': Boolean(error), 'aria-required': required })
          : children}
      </div>
      
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          <span className="form-field__error-icon" aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}