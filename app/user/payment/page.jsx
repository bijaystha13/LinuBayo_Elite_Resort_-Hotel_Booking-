"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  Calendar,
  User,
  CheckCircle,
  Plus,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Star,
} from "lucide-react";

import styles from "./userspayment.module.css";

const PaymentPage = () => {
  const [savedCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 4532",
      holder: "John Doe",
      expiry: "12/25",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "**** **** **** 8901",
      holder: "John Doe",
      expiry: "09/26",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
    setShowAddCard(false);
  };

  const handleAddNewCard = () => {
    setShowAddCard(true);
    setSelectedCard(null);
  };

  const handlePayment = () => {
    if (selectedCard) {
      alert("Payment processed with saved card!");
    } else if (
      showAddCard &&
      cardDetails.number &&
      cardDetails.holder &&
      cardDetails.expiry &&
      cardDetails.cvv
    ) {
      alert("Payment processed with new card!");
    } else {
      alert("Please select a card or enter card details");
    }
  };

  return (
    <div className={styles.paymentPage}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <Shield size={16} />
            <span>Secure Payment</span>
          </div>
          <div className={styles.headerIcon}>
            <CreditCard size={32} />
            <div className={styles.iconGlow}></div>
          </div>
          <h1 className={styles.headerTitle}>
            Payment <span className={styles.gradientText}>Details</span>
          </h1>
          <p className={styles.headerSubtitle}>
            Complete your booking securely with end-to-end encryption
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.savedCards}>
              {savedCards.length > 0 ? (
                <>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <Sparkles size={24} />
                      Saved Payment Methods
                    </h2>
                    <span className={styles.cardsCount}>
                      {savedCards.length} cards
                    </span>
                  </div>
                  <div className={styles.cardsGrid}>
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className={`${styles.savedCard} ${
                          selectedCard === card.id ? styles.selectedCard : ""
                        }`}
                        onClick={() => handleCardSelect(card.id)}
                        style={{ background: card.gradient }}
                      >
                        <div className={styles.cardShine}></div>
                        <div className={styles.cardPattern}></div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <div className={styles.cardChip}></div>
                            {selectedCard === card.id && (
                              <div className={styles.selectedBadge}>
                                <CheckCircle size={20} />
                              </div>
                            )}
                          </div>
                          <div className={styles.cardNumber}>{card.number}</div>
                          <div className={styles.cardFooter}>
                            <div className={styles.cardInfo}>
                              <span className={styles.cardLabel}>
                                Card Holder
                              </span>
                              <span className={styles.cardHolder}>
                                {card.holder}
                              </span>
                            </div>
                            <div className={styles.cardInfo}>
                              <span className={styles.cardLabel}>Expires</span>
                              <span className={styles.cardExpiry}>
                                {card.expiry}
                              </span>
                            </div>
                          </div>
                          <div className={styles.cardType}>{card.type}</div>
                        </div>
                      </div>
                    ))}

                    <div
                      className={`${styles.savedCard} ${styles.addCardButton}`}
                      onClick={handleAddNewCard}
                    >
                      <div className={styles.addCardContent}>
                        <div className={styles.addIconWrapper}>
                          <Plus size={32} />
                        </div>
                        <span className={styles.addCardText}>Add New Card</span>
                        <span className={styles.addCardSubtext}>
                          Quick & Secure
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIconWrapper}>
                    <CreditCard className={styles.emptyIcon} size={64} />
                    <div className={styles.emptyIconGlow}></div>
                  </div>
                  <h3 className={styles.emptyTitle}>No Saved Cards</h3>
                  <p className={styles.emptyDescription}>
                    Add your card details to complete the booking securely
                  </p>
                </div>
              )}

              {(showAddCard || savedCards.length === 0) && (
                <div className={styles.paymentForm}>
                  <div className={styles.formHeader}>
                    <h2 className={styles.sectionTitle}>
                      <Lock size={24} />
                      {savedCards.length === 0
                        ? "Enter Card Details"
                        : "Add New Card"}
                    </h2>
                    <div className={styles.securityBadge}>
                      <Shield size={14} />
                      <span>256-bit SSL</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Card Number</label>
                    <div className={styles.inputWrapper}>
                      <CreditCard className={styles.inputIcon} size={20} />
                      <input
                        type="text"
                        name="number"
                        className={styles.input}
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        maxLength="19"
                      />
                      <div className={styles.inputGlow}></div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cardholder Name</label>
                    <div className={styles.inputWrapper}>
                      <User className={styles.inputIcon} size={20} />
                      <input
                        type="text"
                        name="holder"
                        className={styles.input}
                        placeholder="John Doe"
                        value={cardDetails.holder}
                        onChange={handleInputChange}
                      />
                      <div className={styles.inputGlow}></div>
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Expiry Date</label>
                      <div className={styles.inputWrapper}>
                        <Calendar className={styles.inputIcon} size={20} />
                        <input
                          type="text"
                          name="expiry"
                          className={styles.input}
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleInputChange}
                          maxLength="5"
                        />
                        <div className={styles.inputGlow}></div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>CVV</label>
                      <div className={styles.inputWrapper}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                          type="text"
                          name="cvv"
                          className={styles.input}
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          maxLength="4"
                        />
                        <div className={styles.inputGlow}></div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className={styles.checkboxInput}
                    />
                    <label htmlFor="saveCard" className={styles.checkboxLabel}>
                      <div className={styles.checkboxBox}>
                        {saveCard && <CheckCircle size={16} />}
                      </div>
                      <span>Save this card for future bookings</span>
                    </label>
                  </div>

                  <div className={styles.securityNote}>
                    <Shield className={styles.securityIcon} size={18} />
                    <div className={styles.securityText}>
                      <strong>Your payment is secure</strong>
                      <span>
                        Protected by 256-bit SSL encryption & PCI DSS compliant
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <Shield size={24} />
                <span>SSL Secured</span>
              </div>
              <div className={styles.trustBadge}>
                <Lock size={24} />
                <span>PCI Compliant</span>
              </div>
              <div className={styles.trustBadge}>
                <Zap size={24} />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.bookingSummary}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryHeader}>
                  <h2 className={styles.summaryTitle}>
                    <TrendingUp size={24} />
                    Booking Summary
                  </h2>
                  <div className={styles.premiumBadge}>
                    <Star size={14} />
                    <span>Premium</span>
                  </div>
                </div>

                <div className={styles.hotelPreview}>
                  <div className={styles.hotelEmoji}>🏨</div>
                  <div className={styles.hotelInfo}>
                    <h3 className={styles.hotelName}>Grand Plaza Hotel</h3>
                    <div className={styles.hotelRating}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>

                <div className={styles.summaryDivider}></div>

                <div className={styles.summaryDetails}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Calendar size={16} />
                      Check-in
                    </span>
                    <span className={styles.summaryValue}>Dec 15, 2025</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Calendar size={16} />
                      Check-out
                    </span>
                    <span className={styles.summaryValue}>Dec 18, 2025</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <User size={16} />
                      Guests
                    </span>
                    <span className={styles.summaryValue}>2 Adults</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Sparkles size={16} />
                      Room Type
                    </span>
                    <span className={styles.summaryValue}>Deluxe Suite</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Nights</span>
                    <span className={styles.summaryValue}>3</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Price per night</span>
                    <span className={styles.summaryValue}>$250</span>
                  </div>
                </div>

                <div className={styles.summaryDivider}></div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Subtotal</span>
                    <span className={styles.summaryValue}>$750.00</span>
                  </div>

                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Taxes & Fees</span>
                    <span className={styles.summaryValue}>$112.50</span>
                  </div>
                </div>

                <div className={styles.totalSection}>
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total Amount</span>
                    <div className={styles.totalPrice}>
                      <span className={styles.totalAmount}>$862.50</span>
                      <span className={styles.totalCurrency}>USD</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.cancelButton}>
                    <span>Cancel</span>
                  </button>
                  <button
                    className={styles.confirmButton}
                    onClick={handlePayment}
                  >
                    <Lock size={18} />
                    <span>Confirm Payment</span>
                    <div className={styles.buttonGlow}></div>
                  </button>
                </div>

                <div className={styles.moneyBackBadge}>
                  <Shield size={16} />
                  <span>100% Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
