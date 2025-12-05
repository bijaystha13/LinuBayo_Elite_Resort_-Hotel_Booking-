import { useState } from "react";

export const useConfirmation = () => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "warning",
    isLoading: false,
  });

  const showConfirmation = ({
    title,
    message,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "warning",
  }) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText,
      cancelText,
      type,
      isLoading: false,
    });
  };

  const hideConfirmation = () => {
    setConfirmationState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
    }));
  };

  const handleConfirm = async () => {
    if (confirmationState.onConfirm) {
      setConfirmationState((prev) => ({ ...prev, isLoading: true }));

      try {
        await confirmationState.onConfirm();
        hideConfirmation();
      } catch (error) {
        setConfirmationState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    }
  };

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  };
};
