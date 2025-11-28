"use client";

import React from "react";
import { Star, MapPin, Heart } from "lucide-react";
import styles from "./HotelsGrid.module.css";

const HotelsGrid = ({ destinations, onExplore }) => {
  return (
    <div className={styles.hotelsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Popular Destinations</h2>
        <p className={styles.sectionDescription}>
          Discover the most amazing places across Asia
        </p>
      </div>

      <div className={styles.hotelsGrid}>
        {destinations.map((destination) => (
          <div key={destination.id} className={styles.hotelCard}>
            <div className={styles.hotelImageWrapper}>
              <div className={styles.hotelImage}>
                <div className={styles.hotelEmoji}>{destination.image}</div>
              </div>
              <button className={styles.favoriteBtn}>
                <Heart className={styles.heartIcon} />
              </button>
              <div className={styles.countryBadge}>{destination.country}</div>
            </div>

            <div className={styles.hotelContent}>
              <div className={styles.hotelHeader}>
                <h3 className={styles.hotelName}>{destination.name}</h3>
                <div className={styles.hotelRating}>
                  <Star className={styles.starIcon} />
                  <span className={styles.ratingValue}>
                    {destination.rating}
                  </span>
                  <span className={styles.reviewCount}>
                    ({destination.reviews})
                  </span>
                </div>
              </div>

              <div className={styles.hotelLocation}>
                <MapPin className={styles.locationIcon} />
                <span>{destination.hotels} hotels available</span>
              </div>

              <p className={styles.hotelDescription}>
                {destination.description}
              </p>

              <div className={styles.highlights}>
                {destination.highlights.map((highlight, index) => (
                  <span key={index} className={styles.highlightTag}>
                    {highlight}
                  </span>
                ))}
              </div>

              <div className={styles.hotelFooter}>
                <div className={styles.hotelPrice}>
                  <span className={styles.priceLabel}>Starting from</span>
                  <div className={styles.priceAmount}>{destination.price}</div>
                </div>
                <button
                  className={styles.viewButton}
                  onClick={() => onExplore(destination.country)}
                >
                  Explore Hotels
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsGrid;
