import React from "react";
import { Phone, Mail, Globe } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const ContactInfo = ({ contact }) => {
  if (!contact) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Contact Information</h2>
      <div className={styles.contactGrid}>
        {contact.phone && (
          <div className={styles.contactItem}>
            <Phone className={styles.contactIcon} />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.email && (
          <div className={styles.contactItem}>
            <Mail className={styles.contactIcon} />
            <span>{contact.email}</span>
          </div>
        )}
        {contact.website && (
          <div className={styles.contactItem}>
            <Globe className={styles.contactIcon} />
            <a href={contact.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
