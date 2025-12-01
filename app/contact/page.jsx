"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Globe,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className={styles.contactPage}>
      {/* Background Orbs */}
      <div className={styles.background}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <MessageSquare className={styles.badgeIcon} />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className={styles.heroTitle}>
            Get in <span className={styles.gradient}>Touch</span>
          </h1>
          <p className={styles.heroDescription}>
            Have questions about your booking? Need assistance planning your
            perfect stay? Our dedicated team is available 24/7 to help make your
            travel dreams come true.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Phone />
            </div>
            <h3 className={styles.infoTitle}>Phone</h3>
            <p className={styles.infoText}>+1 (555) 123-4567</p>
            <p className={styles.infoText}>+1 (555) 987-6543</p>
            <p className={styles.infoSubtext}>Mon-Fri 9am-6pm EST</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Mail />
            </div>
            <h3 className={styles.infoTitle}>Email</h3>
            <p className={styles.infoText}>support@hotelbook.com</p>
            <p className={styles.infoText}>reservations@hotelbook.com</p>
            <p className={styles.infoSubtext}>Response within 24 hours</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <MapPin />
            </div>
            <h3 className={styles.infoTitle}>Office</h3>
            <p className={styles.infoText}>123 Travel Avenue</p>
            <p className={styles.infoText}>New York, NY 10001</p>
            <p className={styles.infoSubtext}>United States</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Clock />
            </div>
            <h3 className={styles.infoTitle}>Support Hours</h3>
            <p className={styles.infoText}>24/7 Customer Support</p>
            <p className={styles.infoText}>Live Chat Available</p>
            <p className={styles.infoSubtext}>Always here for you</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <p className={styles.formDescription}>
                Fill out the information below and our team will get back to you
                as soon as possible.
              </p>
            </div>

            <div className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.formInput}
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                ></textarea>
              </div>

              <button onClick={handleSubmit} className={styles.submitButton}>
                <Send className={styles.buttonIcon} />
                {submitted ? "Message Sent!" : "Send Message"}
              </button>

              {submitted && (
                <div className={styles.successMessage}>
                  Thank you! We&apos;ve received your message and will respond
                  shortly.
                </div>
              )}
            </div>
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>
                <Headphones />
              </div>
              <h3 className={styles.helpTitle}>Need Immediate Help?</h3>
              <p className={styles.helpText}>
                Our customer support team is available 24/7 to assist you with
                any urgent matters.
              </p>
              <button className={styles.helpButton}>Start Live Chat</button>
            </div>

            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>
                <Globe />
              </div>
              <h3 className={styles.helpTitle}>Global Support</h3>
              <p className={styles.helpText}>
                We provide support in multiple languages and time zones to serve
                you better.
              </p>
              <div className={styles.languageList}>
                <span className={styles.languageTag}>English</span>
                <span className={styles.languageTag}>Spanish</span>
                <span className={styles.languageTag}>French</span>
                <span className={styles.languageTag}>German</span>
              </div>
            </div>

            <div className={styles.faqPrompt}>
              <h4 className={styles.faqTitle}>Looking for Quick Answers?</h4>
              <p className={styles.faqText}>
                Check out our FAQ section for instant solutions to common
                questions.
              </p>
              <button className={styles.faqButton}>Visit FAQ</button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <MapPin className={styles.mapIcon} />
          <p className={styles.mapText}>Interactive Map</p>
          <p className={styles.mapSubtext}>
            123 Travel Avenue, New York, NY 10001
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
