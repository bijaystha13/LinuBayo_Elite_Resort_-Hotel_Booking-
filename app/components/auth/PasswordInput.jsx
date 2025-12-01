import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import styles from "@/app/login/login.module.css";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled = false,
  autoComplete = "current-password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.formLabel}>{label}</label>}
      <div className={styles.inputWrapper}>
        <Lock className={styles.inputIcon} />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${styles.formInput} ${error ? styles.inputError : ""}`}
        />
        <button
          type="button"
          className={styles.eyeButton}
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className={styles.eyeIcon} />
          ) : (
            <Eye className={styles.eyeIcon} />
          )}
        </button>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default PasswordInput;
