import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
// import styles from "./login.module.css";
import styles from "@/app/login/login.module.css";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoFocus = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <div className={styles.inputWrapper}>
        <Lock className={styles.inputIcon} />
        <input
          type={show ? "text" : "password"}
          name={name}
          className={`${styles.formInput} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        <button
          type="button"
          className={styles.eyeButton}
          onClick={() => setShow(!show)}
        >
          {show ? (
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
