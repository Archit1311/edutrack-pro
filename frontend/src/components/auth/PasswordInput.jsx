import { useState } from 'react';

export default function PasswordInput({
  value,
  onChange,
  placeholder = '••••••••',
  required = true,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="input-wrapper">
      <div className="input-icon">
        <span className="material-symbols-outlined">lock</span>
      </div>
      <input
        type={visible ? 'text' : 'password'}
        className="form-input form-input--mono"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete="current-password"
      />
      <button
        type="button"
        className="input-toggle-btn"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <span className="material-symbols-outlined">
          {visible ? 'visibility' : 'visibility_off'}
        </span>
      </button>
    </div>
  );
}
