import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, title, message, type = "error" }) => {
  useEffect(() => {
    if (!isOpen) return;

    // Close on ESC key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalCard}>
        <div className={styles.modalContent}>
          <div className={`${styles.modalIcon} ${styles[type]}`}>
            {type === "error" ? "⚠️" : "✓"}
          </div>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalMessage}>{message}</p>
          <button className={styles.modalButton} onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
