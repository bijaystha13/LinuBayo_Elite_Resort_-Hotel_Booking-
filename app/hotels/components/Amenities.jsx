import React from "react";
import { Wifi, Coffee, Car, Utensils, Wind, Tv, Check } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const amenityIcons = {
  WiFi: Wifi,
  "Free Breakfast": Coffee,
  Parking: Car,
  Restaurant: Utensils,
  "Air Conditioning": Wind,
  TV: Tv,
};

const Amenities = ({ amenities }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Amenities</h2>
      <div className={styles.amenitiesGrid}>
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] || Check;
          return (
            <div key={index} className={styles.amenityItem}>
              <Icon className={styles.amenityIcon} />
              <span>{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;
