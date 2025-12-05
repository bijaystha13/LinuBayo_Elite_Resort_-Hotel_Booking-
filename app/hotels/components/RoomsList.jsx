import React from "react";
import { User, Check, X } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const RoomsList = ({ rooms, selectedRoom, onSelectRoom }) => {
  if (!rooms || rooms.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Available Rooms</h2>
      <div className={styles.roomsGrid}>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`${styles.roomCard} ${
              selectedRoom === index ? styles.roomSelected : ""
            }`}
            onClick={() => onSelectRoom(index)}
          >
            <div className={styles.roomHeader}>
              <h3 className={styles.roomType}>{room.type}</h3>
              <span className={styles.roomPrice}>
                ${room.pricePerNight}
                <span className={styles.roomPriceLabel}>/night</span>
              </span>
            </div>
            <p className={styles.roomDescription}>{room.description}</p>
            <div className={styles.roomFeatures}>
              <span>
                <User className={styles.featureIcon} />
                {room.capacity} guests
              </span>
              {room.available ? (
                <span className={styles.available}>
                  <Check className={styles.featureIcon} />
                  Available
                </span>
              ) : (
                <span className={styles.unavailable}>
                  <X className={styles.featureIcon} />
                  Booked
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
