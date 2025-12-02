"use client";

import React from "react";
import { Star, MapPin, Heart } from "lucide-react";
import styles from "./HotelsGrid.module.css";
import { useRouter } from "next/navigation";

const HotelsGrid = ({ destinations }) => {
  const router = useRouter();

  const handleExplore = (hotelId) => {
    router.push(`/hotels/${hotelId}`);
  };

  return (
    <div className={styles.hotelsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Available Hotels</h2>
        <p className={styles.sectionDescription}>
          Discover amazing hotels around the world
        </p>
      </div>

      <div className={styles.hotelsGrid}>
        {destinations.map((hotel, index) => (
          <div
            key={hotel._id || hotel.id || index}
            className={styles.hotelCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.hotelImageWrapper}>
              <div className={styles.hotelImage}>
                {hotel.images && hotel.images.length > 0 ? (
                  <img
                    src={`http://localhost:5002/${hotel.images[0]}`}
                    alt={hotel.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      console.error("Failed to load image:", hotel.images[0]);
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className={styles.hotelEmoji}>🏨</div>
                )}
              </div>
              <button className={styles.favoriteBtn}>
                <Heart className={styles.heartIcon} />
              </button>
              {hotel.featured && (
                <div className={styles.featuredBadge}>Featured</div>
              )}
              {hotel.location?.country && (
                <div className={styles.countryBadge}>
                  {hotel.location.country}
                </div>
              )}
            </div>

            <div className={styles.hotelContent}>
              <div className={styles.hotelHeader}>
                <h3 className={styles.hotelName}>{hotel.name}</h3>
                <div className={styles.hotelRating}>
                  <Star className={styles.starIcon} />
                  <span className={styles.ratingValue}>
                    {hotel.rating || "N/A"}
                  </span>
                </div>
              </div>

              <div className={styles.hotelLocation}>
                <MapPin className={styles.locationIcon} />
                <span>
                  {hotel.location?.city && hotel.location?.country
                    ? `${hotel.location.city}, ${hotel.location.country}`
                    : hotel.location?.city ||
                      hotel.location?.country ||
                      "Location not specified"}
                </span>
              </div>

              {hotel.description && (
                <p className={styles.hotelDescription}>
                  {hotel.description.length > 100
                    ? `${hotel.description.substring(0, 100)}...`
                    : hotel.description}
                </p>
              )}

              {hotel.type && (
                <div className={styles.highlights}>
                  <span className={styles.highlightTag}>{hotel.type}</span>
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <>
                      {hotel.amenities.slice(0, 2).map((amenity, idx) => (
                        <span key={idx} className={styles.highlightTag}>
                          {amenity}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              )}

              <div className={styles.hotelFooter}>
                <div className={styles.hotelPrice}>
                  <span className={styles.priceLabel}>Per night</span>
                  <div className={styles.priceAmount}>
                    ${hotel.pricePerNight || "N/A"}
                  </div>
                </div>
                <button
                  className={styles.viewButton}
                  onClick={() => handleExplore(hotel._id || hotel.id)}
                >
                  View Details
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
