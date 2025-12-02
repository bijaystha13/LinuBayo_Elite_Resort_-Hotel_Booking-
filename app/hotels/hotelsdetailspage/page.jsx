"use client";

import React, { useState } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Wind,
  Tv,
  Shield,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Award,
  ThumbsUp,
} from "lucide-react";
import styles from "./hotelspage.module.css";

export default function HotelDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const hotelImages = [
    { id: 1, type: "Exterior", emoji: "🏨" },
    { id: 2, type: "Pool", emoji: "🏊" },
    { id: 3, type: "Restaurant", emoji: "🍽️" },
    { id: 4, type: "Room", emoji: "🛏️" },
    { id: 5, type: "Spa", emoji: "💆" },
  ];

  const amenities = [
    { icon: Wifi, name: "Free WiFi", available: true },
    { icon: Coffee, name: "Coffee Shop", available: true },
    { icon: Car, name: "Free Parking", available: true },
    { icon: UtensilsCrossed, name: "Restaurant", available: true },
    { icon: Dumbbell, name: "Fitness Center", available: true },
    { icon: Wind, name: "Air Conditioning", available: true },
    { icon: Tv, name: "Smart TV", available: true },
    { icon: Shield, name: "24/7 Security", available: true },
  ];

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      size: "45 m²",
      beds: "1 King Bed",
      guests: 2,
      price: 299,
      originalPrice: 399,
      features: ["Ocean View", "Balcony", "Mini Bar", "Smart TV"],
    },
    {
      id: 2,
      name: "Executive Suite",
      size: "65 m²",
      beds: "1 King Bed + Sofa",
      guests: 3,
      price: 449,
      originalPrice: 599,
      features: ["Premium View", "Living Room", "Jacuzzi", "Work Desk"],
    },
    {
      id: 3,
      name: "Family Room",
      size: "55 m²",
      beds: "2 Queen Beds",
      guests: 4,
      price: 379,
      originalPrice: 499,
      features: ["City View", "Kitchenette", "Extra Space", "Kids Welcome"],
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely stunning hotel! The ocean view was breathtaking and the staff were incredibly helpful. Would definitely stay here again.",
      avatar: "👩",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "1 week ago",
      comment:
        "Perfect location, amazing amenities. The spa was top-notch and the restaurant served delicious food. Highly recommend!",
      avatar: "👨",
    },
    {
      id: 3,
      name: "Emma Williams",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Great stay overall. Room was spacious and clean. Only minor issue was the WiFi speed, but everything else was perfect.",
      avatar: "👱‍♀️",
    },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % hotelImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + hotelImages.length) % hotelImages.length
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton}>
            <ChevronLeft className={styles.icon} />
            Back to Search
          </button>
          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <Share2 className={styles.icon} />
            </button>
            <button
              className={`${styles.iconButton} ${
                isFavorite ? styles.favoriteActive : ""
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={styles.icon}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </header>

      <section className={styles.gallerySection}>
        <div className={styles.mainImageContainer}>
          <div className={styles.featuredBadge}>
            <Award className={styles.badgeIcon} />
            Featured Property
          </div>
          <div className={styles.discountBadge}>25% OFF</div>

          <div className={styles.mainImage}>
            <div className={styles.imageEmoji}>
              {hotelImages[selectedImage].emoji}
            </div>
            <div className={styles.imageLabel}>
              {hotelImages[selectedImage].type}
            </div>
          </div>

          <button className={styles.navButton} onClick={prevImage}>
            <ChevronLeft className={styles.icon} />
          </button>
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={nextImage}
          >
            <ChevronRight className={styles.icon} />
          </button>
        </div>

        <div className={styles.thumbnails}>
          {hotelImages.map((img, index) => (
            <button
              key={img.id}
              className={`${styles.thumbnail} ${
                selectedImage === index ? styles.thumbnailActive : ""
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className={styles.thumbnailEmoji}>{img.emoji}</div>
              <span className={styles.thumbnailLabel}>{img.type}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.hotelHeader}>
            <div>
              <div className={styles.categoryBadge}>5-Star Luxury Resort</div>
              <h1 className={styles.hotelName}>The Grand Azure Resort</h1>
              <div className={styles.location}>
                <MapPin className={styles.locationIcon} />
                <span>1234 Ocean Drive, Malibu, California 90265</span>
              </div>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingScore}>4.9</div>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={styles.starIcon}
                    fill="currentColor"
                  />
                ))}
              </div>
              <div className={styles.reviewCount}>2,847 reviews</div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>About This Property</h2>
            <p className={styles.description}>
              Experience luxury at its finest at The Grand Azure Resort. Nestled
              along the pristine coastline of Malibu, our resort offers
              breathtaking ocean views, world-class amenities, and exceptional
              service. Each room is elegantly designed with modern furnishings
              and state-of-the-art technology.
            </p>
            <p className={styles.description}>
              Indulge in our award-winning spa, savor exquisite cuisine at our
              Michelin-starred restaurant, or simply relax by our infinity pool
              overlooking the Pacific Ocean. Whether you're here for business or
              leisure, we ensure an unforgettable stay.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Amenities & Services</h2>
            <div className={styles.amenitiesGrid}>
              {amenities.map((amenity, index) => (
                <div key={index} className={styles.amenityItem}>
                  <div className={styles.amenityIcon}>
                    <amenity.icon className={styles.icon} />
                  </div>
                  <span className={styles.amenityName}>{amenity.name}</span>
                  {amenity.available && (
                    <CheckCircle className={styles.checkIcon} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Available Rooms</h2>
            <div className={styles.roomsGrid}>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`${styles.roomCard} ${
                    selectedRoom === room.id ? styles.roomCardSelected : ""
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className={styles.roomHeader}>
                    <div>
                      <h3 className={styles.roomName}>{room.name}</h3>
                      <div className={styles.roomDetails}>
                        <span>{room.size}</span>
                        <span>•</span>
                        <span>{room.beds}</span>
                        <span>•</span>
                        <span>Up to {room.guests} guests</span>
                      </div>
                    </div>
                    {room.originalPrice > room.price && (
                      <div className={styles.roomDiscount}>
                        {Math.round(
                          ((room.originalPrice - room.price) /
                            room.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  <div className={styles.roomFeatures}>
                    {room.features.map((feature, idx) => (
                      <span key={idx} className={styles.featureTag}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className={styles.roomFooter}>
                    <div className={styles.roomPrice}>
                      {room.originalPrice > room.price && (
                        <span className={styles.originalPrice}>
                          ${room.originalPrice}
                        </span>
                      )}
                      <div className={styles.currentPrice}>
                        <span className={styles.priceAmount}>
                          ${room.price}
                        </span>
                        <span className={styles.priceLabel}>/night</span>
                      </div>
                    </div>
                    <button className={styles.selectButton}>
                      {selectedRoom === room.id ? "Selected" : "Select Room"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.reviewsHeader}>
              <h2 className={styles.sectionTitle}>Guest Reviews</h2>
              <button className={styles.seeAllButton}>
                See All Reviews
                <ChevronRight className={styles.icon} />
              </button>
            </div>

            <div className={styles.reviewsGrid}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>{review.avatar}</div>
                    <div className={styles.reviewInfo}>
                      <h4 className={styles.reviewerName}>{review.name}</h4>
                      <div className={styles.reviewMeta}>
                        <div className={styles.reviewRating}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className={styles.reviewStar}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        <span className={styles.reviewDate}>{review.date}</span>
                      </div>
                    </div>
                    <button className={styles.likeButton}>
                      <ThumbsUp className={styles.icon} />
                    </button>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.contactValue}>+1 (555) 123-4567</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>info@grandazure.com</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Clock className={styles.contactIcon} />
                <div>
                  <div className={styles.contactLabel}>Check-in</div>
                  <div className={styles.contactValue}>3:00 PM - 11:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <div className={styles.bookingPrice}>
                <span className={styles.priceStrike}>$899</span>
                <div className={styles.currentPriceMain}>
                  <span className={styles.priceMain}>$599</span>
                  <span className={styles.priceNight}>/night</span>
                </div>
              </div>
              <div className={styles.savingsBadge}>Save $300</div>
            </div>

            <div className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Check-in</label>
                <div className={styles.inputWrapper}>
                  <Calendar className={styles.inputIcon} />
                  <input
                    type="date"
                    className={styles.formInput}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Check-out</label>
                <div className={styles.inputWrapper}>
                  <Calendar className={styles.inputIcon} />
                  <input
                    type="date"
                    className={styles.formInput}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Guests</label>
                <div className={styles.inputWrapper}>
                  <Users className={styles.inputIcon} />
                  <select
                    className={styles.formInput}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5+ Guests</option>
                  </select>
                </div>
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>$599 × 3 nights</span>
                  <span>$1,797</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Service fee</span>
                  <span>$89</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Taxes</span>
                  <span>$143</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>$2,029</span>
                </div>
              </div>

              <button className={styles.bookButton}>Reserve Now</button>

              <div className={styles.bookingNote}>
                <Shield className={styles.noteIcon} />
                <span>Free cancellation within 24 hours</span>
              </div>
            </div>
          </div>

          <div className={styles.highlightsCard}>
            <h3 className={styles.highlightsTitle}>Why Book Here?</h3>
            <div className={styles.highlightsList}>
              <div className={styles.highlightItem}>
                <CheckCircle className={styles.highlightIcon} />
                <span>Best Price Guarantee</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle className={styles.highlightIcon} />
                <span>Free Cancellation</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle className={styles.highlightIcon} />
                <span>Instant Confirmation</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle className={styles.highlightIcon} />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
