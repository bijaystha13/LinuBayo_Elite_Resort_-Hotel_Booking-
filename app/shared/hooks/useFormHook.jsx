"use client";

import { useState } from "react";

/**
 * Custom useForm Hook for form management
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Callback function when form is submitted
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /**
   * Handle input blur (mark field as touched)
   * @param {Event} e - Input blur event
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate before submit
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  /**
   * Validate form values
   * @param {Object} formValues - Current form values
   * @returns {Object} Validation errors
   */
  const validate = (formValues) => {
    const newErrors = {};

    // Email validation
    if (formValues.email !== undefined) {
      if (!formValues.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = "Email is invalid";
      }
    }

    // Password validation
    if (formValues.password !== undefined) {
      if (!formValues.password) {
        newErrors.password = "Password is required";
      } else if (formValues.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    // Confirm password validation
    if (formValues.confirmPassword !== undefined) {
      if (!formValues.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formValues.password !== formValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // First name validation
    if (formValues.firstName !== undefined && !formValues.firstName) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (formValues.lastName !== undefined && !formValues.lastName) {
      newErrors.lastName = "Last name is required";
    }

    // Phone validation
    if (formValues.phone !== undefined) {
      if (!formValues.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[\d\s\-\+\(\)]+$/.test(formValues.phone)) {
        newErrors.phone = "Phone number is invalid";
      }
    }

    // Date of birth validation
    if (formValues.dateOfBirth !== undefined && !formValues.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    // Terms agreement validation
    if (formValues.agreeToTerms !== undefined && !formValues.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    // Destination validation (for search forms)
    if (formValues.destination !== undefined && !formValues.destination) {
      newErrors.destination = "Destination is required";
    }

    // Check-in date validation
    if (formValues.checkIn !== undefined && !formValues.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }

    // Check-out date validation
    if (formValues.checkOut !== undefined) {
      if (!formValues.checkOut) {
        newErrors.checkOut = "Check-out date is required";
      } else if (
        formValues.checkIn &&
        formValues.checkOut <= formValues.checkIn
      ) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }

    // Guests validation
    if (formValues.guests !== undefined) {
      if (!formValues.guests || formValues.guests < 1) {
        newErrors.guests = "At least 1 guest is required";
      }
    }

    // Name validation (generic)
    if (formValues.name !== undefined && !formValues.name) {
      newErrors.name = "Name is required";
    }

    // Message validation (for contact forms)
    if (formValues.message !== undefined) {
      if (!formValues.message) {
        newErrors.message = "Message is required";
      } else if (formValues.message.length < 10) {
        newErrors.message = "Message must be at least 10 characters";
      }
    }

    // Subject validation (for contact forms)
    if (formValues.subject !== undefined && !formValues.subject) {
      newErrors.subject = "Subject is required";
    }

    return newErrors;
  };

  /**
   * Reset form to initial values
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  /**
   * Set a specific field value
   * @param {string} name - Field name
   * @param {any} value - Field value
   */
  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  /**
   * Set a specific field error
   * @param {string} name - Field name
   * @param {string} error - Error message
   */
  const setFieldError = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  /**
   * Check if form has any errors
   * @returns {boolean}
   */
  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  /**
   * Check if form is valid (no errors after validation)
   * @returns {boolean}
   */
  const isValid = () => {
    const validationErrors = validate(values);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
    setFieldValue,
    setFieldError,
    hasErrors,
    isValid,
  };
};

export default useForm;
