import React from "react";
// import styles from "./login.module.css";
import styles from "@/app/login/login.module.css";

const CheckboxInput = ({ label, name, checked, onChange, error }) => (
  <div className={styles.termsContainer}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        name={name}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
    {error && <span className={styles.errorText}>{error}</span>}
  </div>
);

export default CheckboxInput;
