import React from "react";
// import styles from "./login.module.css";
import styles from "@/app/login/login.module.css";

const SocialButton = ({ icon, children, onClick }) => (
  <button type="button" className={styles.socialButton} onClick={onClick}>
    <span className={styles.socialIcon}>{icon}</span>
    {children}
  </button>
);

export default SocialButton;
