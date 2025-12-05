"use client";

import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Hotel,
  Star,
  CreditCard,
  Mail,
  Download,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import styles from "../userbooking.module.css";
// import styles from "./BookingCardComponent.module.css";

const BookingCard = ({
  booking,
  onViewReceipt,
  onCancel,
  onEmailConfirmation,
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Check className={styles.statusIcon} />;
      case "completed":
        return <Check className={styles.statusIcon} />;
      case "cancelled":
        return <X className={styles.statusIcon} />;
      case "pending":
        return <AlertCircle className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return styles.statusConfirmed;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      case "pending":
        return styles.statusPending;
      default:
        return "";
    }
  };

  return (
    <div className={styles.bookingCard}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.bookingId}>
          Booking ID: <span>{booking.bookingId}</span>
        </div>
        <div
          className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}
        >
          {getStatusIcon(booking.status)}
          <span>{booking.status}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className={styles.cardBody}>
        {/* Hotel Info */}
        <div className={styles.hotelInfo}>
          <div className={styles.hotelEmoji}>🏨</div>
          <div className={styles.hotelDetails}>
            <h3 className={styles.hotelName}>{booking.hotelName}</h3>
            <div className={styles.hotelLocation}>
              <MapPin className={styles.locationIcon} />
              <span>{booking.location}</span>
            </div>
            {booking.rating && (
              <div className={styles.hotelRating}>
                <Star className={styles.starIcon} />
                <span>{booking.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className={styles.bookingDetails}>
          <div className={styles.detailRow}>
            <div className={styles.detailItem}>
              <Calendar className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>Check-in</div>
                <div className={styles.detailValue}>
                  {new Date(booking.checkIn).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Calendar className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>Check-out</div>
                <div className={styles.detailValue}>
                  {new Date(booking.checkOut).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Users className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>Guests</div>
                <div className={styles.detailValue}>
                  {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Hotel className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>Room Type</div>
                <div className={styles.detailValue}>{booking.roomType}</div>
              </div>
            </div>
          </div>

          <div className={styles.paymentInfo}>
            <CreditCard className={styles.paymentIcon} />
            <span className={styles.paymentMethod}>
              {booking.paymentMethod || "Credit Card"}
            </span>
            <div className={styles.totalPrice}>
              <span className={styles.priceLabel}>Total:</span>
              <span className={styles.priceAmount}>${booking.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.bookingDate}>
          Booked on{" "}
          {new Date(
            booking.createdAt || booking.bookingDate
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        <div className={styles.cardActions}>
          {booking.status === "confirmed" && (
            <>
              <button
                className={styles.secondaryButton}
                onClick={() => onEmailConfirmation(booking)}
              >
                <Mail className={styles.buttonIcon} />
                Email Confirmation
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => onViewReceipt(booking)}
              >
                <Download className={styles.buttonIcon} />
                Download
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => onCancel(booking)}
              >
                Cancel Booking
              </button>
            </>
          )}

          {booking.status === "completed" && (
            <>
              <button
                className={styles.secondaryButton}
                onClick={() => onViewReceipt(booking)}
              >
                <Download className={styles.buttonIcon} />
                Download Receipt
              </button>
              <button className={styles.primaryButton}>Write a Review</button>
              <button className={styles.primaryButton}>Book Again</button>
            </>
          )}

          {booking.status === "cancelled" && (
            <button className={styles.primaryButton}>Book Similar Hotel</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
