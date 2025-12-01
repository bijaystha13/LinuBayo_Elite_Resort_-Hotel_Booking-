import React from "react";
import styles from "@/app/login/login.module.css";

const TextInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled = false,
  autoComplete,
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.formLabel}>{label}</label>}
      <div className={styles.inputWrapper}>
        {Icon && <Icon className={styles.inputIcon} />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete || name}
          className={`${styles.formInput} ${error ? styles.inputError : ""}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextInput;
