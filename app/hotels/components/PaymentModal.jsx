import React, { useState, useEffect } from "react";
import { X, CreditCard, Lock, AlertCircle } from "lucide-react";
import styles from "./PaymentModal.module.css";

const PaymentModal = ({ isOpen, onClose, onConfirm, bookingDetails }) => {
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Fetch saved cards from API or localStorage
      fetchSavedCards();
    }
  }, [isOpen]);

  const fetchSavedCards = async () => {
    // Simulate fetching saved cards
    // Replace with actual API call
    const mockSavedCards = [
      {
        id: 1,
        cardNumber: "**** **** **** 4242",
        cardHolder: "John Doe",
        expiryDate: "12/25",
        type: "Visa",
      },
    ];
    setSavedCards(mockSavedCards);

    if (mockSavedCards.length === 0) {
      setShowNewCardForm(true);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^0-9]/gi, "");
      if (formattedValue.length > 3) return;
    }

    setCardData({ ...cardData, [name]: formattedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateCard = () => {
    const newErrors = {};

    if (!showNewCardForm && !selectedCard) {
      newErrors.card = "Please select a card or add a new one";
      setErrors(newErrors);
      return false;
    }

    if (showNewCardForm) {
      const cardNumberClean = cardData.cardNumber.replace(/\s/g, "");
      if (!cardNumberClean || cardNumberClean.length !== 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!cardData.cardHolder || cardData.cardHolder.length < 3) {
        newErrors.cardHolder = "Please enter the cardholder name";
      }

      const expiryParts = cardData.expiryDate.split("/");
      if (
        !cardData.expiryDate ||
        expiryParts.length !== 2 ||
        expiryParts[0].length !== 2 ||
        expiryParts[1].length !== 2
      ) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      } else {
        const month = parseInt(expiryParts[0]);
        const year = parseInt("20" + expiryParts[1]);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Invalid month";
        } else if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          newErrors.expiryDate = "Card has expired";
        }
      }

      if (!cardData.cvv || cardData.cvv.length !== 3) {
        newErrors.cvv = "Please enter a valid 3-digit CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateCard()) return;

    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const paymentData = showNewCardForm
        ? {
            cardNumber: cardData.cardNumber,
            cardHolder: cardData.cardHolder,
            saveCard: saveCard,
          }
        : {
            savedCardId: selectedCard,
          };

      onConfirm(paymentData);
      handleClose();
    } catch (error) {
      setErrors({ submit: "Payment failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCardData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    });
    setErrors({});
    setSelectedCard(null);
    setShowNewCardForm(false);
    setSaveCard(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <Lock className={styles.titleIcon} />
            Payment Details
          </h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <X />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Booking Summary */}
          <div className={styles.bookingSummary}>
            <h3 className={styles.summaryTitle}>Booking Summary</h3>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Hotel:</span>
                <span>{bookingDetails?.hotelName}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Check-in:</span>
                <span>{bookingDetails?.checkIn}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Check-out:</span>
                <span>{bookingDetails?.checkOut}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Guests:</span>
                <span>{bookingDetails?.guests}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total Amount:</span>
                <span className={styles.totalAmount}>
                  ${bookingDetails?.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Saved Cards */}
          {savedCards.length > 0 && !showNewCardForm && (
            <div className={styles.savedCardsSection}>
              <h3 className={styles.sectionTitle}>Select Payment Method</h3>
              {errors.card && (
                <div className={styles.errorMessage}>
                  <AlertCircle className={styles.errorIcon} />
                  {errors.card}
                </div>
              )}
              <div className={styles.cardsGrid}>
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className={`${styles.savedCard} ${
                      selectedCard === card.id ? styles.selectedCard : ""
                    }`}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <CreditCard className={styles.cardIcon} />
                    <div className={styles.cardDetails}>
                      <p className={styles.cardNumber}>{card.cardNumber}</p>
                      <p className={styles.cardHolder}>{card.cardHolder}</p>
                      <p className={styles.cardExpiry}>
                        Expires {card.expiryDate}
                      </p>
                    </div>
                    <div className={styles.cardType}>{card.type}</div>
                  </div>
                ))}
              </div>
              <button
                className={styles.addCardButton}
                onClick={() => setShowNewCardForm(true)}
              >
                + Add New Card
              </button>
            </div>
          )}

          {/* New Card Form */}
          {showNewCardForm && (
            <div className={styles.newCardForm}>
              <div className={styles.formHeader}>
                <h3 className={styles.sectionTitle}>Card Information</h3>
                {savedCards.length > 0 && (
                  <button
                    className={styles.backButton}
                    onClick={() => setShowNewCardForm(false)}
                  >
                    ← Back to saved cards
                  </button>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Card Number</label>
                <div className={styles.inputWrapper}>
                  <CreditCard className={styles.inputIcon} />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      errors.cardNumber ? styles.inputError : ""
                    }`}
                  />
                </div>
                {errors.cardNumber && (
                  <span className={styles.errorText}>{errors.cardNumber}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cardholder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="John Doe"
                  value={cardData.cardHolder}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${
                    errors.cardHolder ? styles.inputError : ""
                  }`}
                />
                {errors.cardHolder && (
                  <span className={styles.errorText}>{errors.cardHolder}</span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      errors.expiryDate ? styles.inputError : ""
                    }`}
                  />
                  {errors.expiryDate && (
                    <span className={styles.errorText}>
                      {errors.expiryDate}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      errors.cvv ? styles.inputError : ""
                    }`}
                  />
                  {errors.cvv && (
                    <span className={styles.errorText}>{errors.cvv}</span>
                  )}
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="saveCard" className={styles.checkboxLabel}>
                  Save this card for future bookings
                </label>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className={styles.submitError}>
              <AlertCircle className={styles.errorIcon} />
              {errors.submit}
            </div>
          )}

          <div className={styles.securityNote}>
            <Lock className={styles.securityIcon} />
            <p>Your payment information is encrypted and secure</p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Pay $${bookingDetails?.totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
