import React from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./ErrorModal.module.css";

const ErrorModal = ({
  isOpen,
  onClose,
  errors,
  title = "Validation Error",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <AlertCircle className={styles.errorIcon} />
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalDescription}>
            Please fix the following issues to continue:
          </p>

          <ul className={styles.errorList}>
            {errors.map((error, index) => (
              <li key={index} className={styles.errorItem}>
                {error}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.okButton} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
