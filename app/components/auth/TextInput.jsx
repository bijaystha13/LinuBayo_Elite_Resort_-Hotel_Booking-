import React from "react";
// import styles from "./login.module.css";
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
  autoFocus = false,
}) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>{label}</label>
    <div className={styles.inputWrapper}>
      {Icon && <Icon className={styles.inputIcon} />}
      <input
        type={type}
        name={name}
        className={`${styles.formInput} ${error ? styles.inputError : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
    {error && <span className={styles.errorText}>{error}</span>}
  </div>
);

export default TextInput;
