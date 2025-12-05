"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users, Hotel, DollarSign, X } from "lucide-react";
// import styles from "./BookingFormComponent.module.css";
import styles from "../userbooking.module.css";

const BookingForm = ({
  isOpen,
  onClose,
  onSuccess,
  sendRequest,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    totalPrice: "",
  });

  const [errors, setErrors] = useState({});

  const roomTypes = [
    "Standard Room",
    "Deluxe Suite",
    "Ocean Front Room",
    "Premium Cabin",
    "Executive Suite",
    "Family Room",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }
    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    }
    if (formData.checkIn && formData.checkOut) {
      if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "At least 1 guest is required";
    }
    if (!formData.roomType) {
      newErrors.roomType = "Please select a room type";
    }
    if (!formData.totalPrice || formData.totalPrice <= 0) {
      newErrors.totalPrice = "Please enter a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await sendRequest("/bookings", "POST", {
        hotelName: formData.hotelName,
        location: formData.location,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: parseInt(formData.guests),
        roomType: formData.roomType,
        totalPrice: parseFloat(formData.totalPrice),
      });

      if (response.success) {
        onSuccess(response.data);
        handleClose();
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrors({ submit: error.message || "Failed to create booking" });
    }
  };

  const handleClose = () => {
    setFormData({
      hotelName: "",
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      roomType: "",
      totalPrice: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create New Booking</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.submit && (
            <div className={styles.errorAlert}>{errors.submit}</div>
          )}

          <div className={styles.formGrid}>
            {/* Hotel Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Hotel className={styles.labelIcon} />
                Hotel Name
              </label>
              <input
                type="text"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.hotelName ? styles.inputError : ""
                }`}
                placeholder="Enter hotel name"
              />
              {errors.hotelName && (
                <span className={styles.errorText}>{errors.hotelName}</span>
              )}
            </div>

            {/* Location */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <MapPin className={styles.labelIcon} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.location ? styles.inputError : ""
                }`}
                placeholder="City, Country"
              />
              {errors.location && (
                <span className={styles.errorText}>{errors.location}</span>
              )}
            </div>

            {/* Check-in Date */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Calendar className={styles.labelIcon} />
                Check-in Date
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.checkIn ? styles.inputError : ""
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.checkIn && (
                <span className={styles.errorText}>{errors.checkIn}</span>
              )}
            </div>

            {/* Check-out Date */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Calendar className={styles.labelIcon} />
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.checkOut ? styles.inputError : ""
                }`}
                min={formData.checkIn || new Date().toISOString().split("T")[0]}
              />
              {errors.checkOut && (
                <span className={styles.errorText}>{errors.checkOut}</span>
              )}
            </div>

            {/* Guests */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Users className={styles.labelIcon} />
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.guests ? styles.inputError : ""
                }`}
                min="1"
                max="20"
              />
              {errors.guests && (
                <span className={styles.errorText}>{errors.guests}</span>
              )}
            </div>

            {/* Room Type */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Hotel className={styles.labelIcon} />
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.roomType ? styles.inputError : ""
                }`}
              >
                <option value="">Select room type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.roomType && (
                <span className={styles.errorText}>{errors.roomType}</span>
              )}
            </div>

            {/* Total Price */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <DollarSign className={styles.labelIcon} />
                Total Price
              </label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.totalPrice ? styles.inputError : ""
                }`}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.totalPrice && (
                <span className={styles.errorText}>{errors.totalPrice}</span>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
