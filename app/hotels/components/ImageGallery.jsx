/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const ImageGallery = ({
  hotel,
  currentImageIndex,
  onPrev,
  onNext,
  onSelectImage,
  isFavorite,
  setIsFavorite,
}) => (
  <div className={styles.imageGallery}>
    <div className={styles.mainImageContainer}>
      <img
        src={`http://localhost:5002/${hotel.images[currentImageIndex]}`}
        alt={hotel.name}
        className={styles.mainImage}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <div className={styles.imageOverlay}>
        <button className={styles.imageNavButton} onClick={onPrev}>
          <ChevronLeft />
        </button>
        <button className={styles.imageNavButton} onClick={onNext}>
          <ChevronRight />
        </button>
      </div>

      <div className={styles.imageCounter}>
        {currentImageIndex + 1} / {hotel.images?.length || 1}
      </div>

      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionBtn} ${
            isFavorite ? styles.favoriteActive : ""
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={styles.actionIcon} />
        </button>
        <button className={styles.actionBtn}>
          <Share2 className={styles.actionIcon} />
        </button>
      </div>
    </div>

    {hotel.images && hotel.images.length > 1 && (
      <div className={styles.thumbnailGallery}>
        {hotel.images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              index === currentImageIndex ? styles.thumbnailActive : ""
            }`}
            onClick={() => onSelectImage(index)}
          >
            <img
              src={`http://localhost:5002/${image}`}
              alt={`${hotel.name} ${index + 1}`}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ImageGallery;
