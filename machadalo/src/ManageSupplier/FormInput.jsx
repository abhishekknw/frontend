const checkForNull = (data) => {
  if (data === null) {
    return '';
  } else {
    return data;
  }
};

const FormInput = ({
  divClass,
  label,
  type,
  value,
  onChange,
  error,
  readOnly = false,
  required = false,
}) => (
  <div className={`form-group form-control2 has-success ${divClass}`}>
    <label class="control-label">{label}</label>
    <input
      type={type}
      value={checkForNull(value)}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      disabled={readOnly}
      className="form-control ng-valid-invalid-id ng-valid-schema-form"
    />
    {error && <p className="error">{error}</p>}
  </div>
);

export default FormInput;
