import React from "react";
import { X, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import styles from "./BookingsConfirmationModal.module.css";

const BookingsConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning', 'danger', 'success', 'info'
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <XCircle className={styles.iconDanger} />;
      case "success":
        return <CheckCircle className={styles.iconSuccess} />;
      case "info":
        return <Info className={styles.iconInfo} />;
      case "warning":
      default:
        return <AlertTriangle className={styles.iconWarning} />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case "danger":
        return styles.confirmButtonDanger;
      case "success":
        return styles.confirmButtonSuccess;
      case "info":
        return styles.confirmButtonInfo;
      case "warning":
      default:
        return styles.confirmButtonWarning;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X />
        </button>

        <div className={styles.iconContainer}>{getIcon()}</div>

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className={`${styles.confirmButton} ${getConfirmButtonClass()}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingsConfirmationModal;
