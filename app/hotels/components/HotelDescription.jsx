import React from "react";
import styles from "../[id]/hoteldetailpage.module.css";

const HotelDescription = ({ description }) => (
  <div className={styles.section}>
    <h2 className={styles.sectionTitle}>About this property</h2>
    <p className={styles.description}>{description}</p>
  </div>
);

export default HotelDescription;
