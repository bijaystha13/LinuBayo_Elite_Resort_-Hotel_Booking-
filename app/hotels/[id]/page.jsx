"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Wind,
  Tv,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Phone,
  Mail,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";
import styles from "./hoteldetailpage.module.css";
import { useHttp } from "@/app/shared/hooks/useHttpHook";

const HotelDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [hotel, setHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  // Fetch hotel data
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const data = await sendRequest(`/hotels/${id}`);
        if (data.success) {
          setHotel(data.data);
        }
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, sendRequest]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBooking = () => {
    console.log("Booking:", { hotel: hotel._id, ...bookingData });
    // Add booking logic here
  };

  const amenityIcons = {
    WiFi: Wifi,
    "Free Breakfast": Coffee,
    Parking: Car,
    Restaurant: Utensils,
    "Air Conditioning": Wind,
    TV: Tv,
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
        <p className={styles.loadingText}>Loading hotel details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
        <p className={styles.errorText}>{error}</p>
        <button
          className={styles.backButton}
          onClick={() => router.push("/hotels")}
        >
          Back to Hotels
        </button>
      </div>
    );
  }

  if (!hotel) {
    return null;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Back Button */}
      <button
        className={styles.backButtonTop}
        onClick={() => router.push("/hotels")}
      >
        <ChevronLeft className={styles.backIcon} />
        Back to Hotels
      </button>

      {/* Image Gallery */}
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
            <button className={styles.imageNavButton} onClick={handlePrevImage}>
              <ChevronLeft />
            </button>
            <button className={styles.imageNavButton} onClick={handleNextImage}>
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

        {/* Thumbnail Gallery */}
        {hotel.images && hotel.images.length > 1 && (
          <div className={styles.thumbnailGallery}>
            {hotel.images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentImageIndex ? styles.thumbnailActive : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
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

      <div className={styles.contentContainer}>
        {/* Left Column - Hotel Info */}
        <div className={styles.leftColumn}>
          {/* Header Section */}
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

          {/* Description */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>About this property</h2>
            <p className={styles.description}>{hotel.description}</p>
          </div>

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {hotel.amenities.map((amenity, index) => {
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
          )}

          {/* Rooms */}
          {hotel.rooms && hotel.rooms.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Available Rooms</h2>
              <div className={styles.roomsGrid}>
                {hotel.rooms.map((room, index) => (
                  <div
                    key={index}
                    className={`${styles.roomCard} ${
                      selectedRoom === index ? styles.roomSelected : ""
                    }`}
                    onClick={() => setSelectedRoom(index)}
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
          )}

          {/* Policies */}
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

          {/* Contact Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.contactGrid}>
              {hotel.contact?.phone && (
                <div className={styles.contactItem}>
                  <Phone className={styles.contactIcon} />
                  <span>{hotel.contact.phone}</span>
                </div>
              )}
              {hotel.contact?.email && (
                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} />
                  <span>{hotel.contact.email}</span>
                </div>
              )}
              {hotel.contact?.website && (
                <div className={styles.contactItem}>
                  <Globe className={styles.contactIcon} />
                  <a
                    href={hotel.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className={styles.rightColumn}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <div className={styles.bookingPrice}>
                <span className={styles.priceAmount}>
                  ${hotel.pricePerNight}
                </span>
                <span className={styles.priceLabel}>per night</span>
              </div>
            </div>

            <div className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <Calendar className={styles.labelIcon} />
                  Check-in
                </label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={bookingData.checkIn}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, checkIn: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <Calendar className={styles.labelIcon} />
                  Check-out
                </label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={bookingData.checkOut}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      checkOut: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <User className={styles.labelIcon} />
                  Guests
                </label>
                <select
                  className={styles.formInput}
                  value={bookingData.guests}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      guests: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5+ Guests</option>
                </select>
              </div>

              <button className={styles.bookButton} onClick={handleBooking}>
                Book Now
              </button>

              <p className={styles.bookingNote}>You won't be charged yet</p>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.breakdownRow}>
                <span>${hotel.pricePerNight} x 1 night</span>
                <span>${hotel.pricePerNight}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Service fee</span>
                <span>$0</span>
              </div>
              <div className={styles.breakdownDivider}></div>
              <div
                className={`${styles.breakdownRow} ${styles.breakdownTotal}`}
              >
                <span>Total</span>
                <span>${hotel.pricePerNight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
