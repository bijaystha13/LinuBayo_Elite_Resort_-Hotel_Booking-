import React from "react";
import { Clock } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const HouseRules = () => (
  <div className={styles.section}>
    <h2 className={styles.sectionTitle}>House Rules</h2>
    <div className={styles.policiesGrid}>
      <div className={styles.policyItem}>
        <Clock className={styles.policyIcon} />
        <div>
          <h4>Check-in</h4>
          <p>After 3:00 PM</p>
        </div>
      </div>
      <div className={styles.policyItem}>
        <Clock className={styles.policyIcon} />
        <div>
          <h4>Check-out</h4>
          <p>Before 11:00 AM</p>
        </div>
      </div>
    </div>
  </div>
);

export default HouseRules;
