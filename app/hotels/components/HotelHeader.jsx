import React from "react";
import { Star, MapPin } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const HotelHeader = ({ hotel }) => (
  <div className={styles.hotelHeader}>
    <div className={styles.headerTop}>
      <div>
        {hotel.featured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
        <h1 className={styles.hotelTitle}>{hotel.name}</h1>
        <div className={styles.locationRow}>
          <MapPin className={styles.locationIcon} />
          <span className={styles.locationText}>
            {hotel.location?.city}, {hotel.location?.country}
          </span>
        </div>
      </div>

      <div className={styles.ratingContainer}>
        <div className={styles.ratingBox}>
          <Star className={styles.starIcon} />
          <span className={styles.ratingValue}>{hotel.rating}</span>
        </div>
        <p className={styles.ratingLabel}>Excellent</p>
      </div>
    </div>

    <div className={styles.hotelType}>
      <span className={styles.typeTag}>{hotel.type}</span>
    </div>
  </div>
);

export default HotelHeader;
