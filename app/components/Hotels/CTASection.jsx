import React from "react";
import styles from "./CTASection.module.css";

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to Explore Asia?</h2>
        <p className={styles.ctaDescription}>
          Start planning your Asian adventure today. Book with confidence and
          get the best deals on hotels, flights, and experiences across the
          continent.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.primaryBtn}>Book Now</button>
          <button className={styles.secondaryBtn}>Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
