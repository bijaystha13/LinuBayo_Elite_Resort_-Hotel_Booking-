"use client";

import React, { useState } from "react";
import styles from "./userdashboard.module.css";

const UserHome = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories
  const categories = [
    { id: "all", name: "All Hotels", emoji: "🏨", color: "#667eea" },
    { id: "luxury", name: "Luxury", emoji: "👑", color: "#f093fb" },
    { id: "budget", name: "Budget", emoji: "💰", color: "#4facfe" },
    { id: "boutique", name: "Boutique", emoji: "✨", color: "#764ba2" },
    { id: "resort", name: "Resort", emoji: "🏖️", color: "#f5576c" },
    { id: "business", name: "Business", emoji: "💼", color: "#4caf50" },
  ];

  // Featured Hotels
  const featuredHotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "New York, USA",
      rating: 4.8,
      reviews: 1247,
      price: 299,
      emoji: "🏨",
      amenities: ["WiFi", "Pool", "Spa"],
    },
    {
      id: 2,
      name: "Sunset Beach Resort",
      location: "Miami, Florida",
      rating: 4.9,
      reviews: 892,
      price: 399,
      emoji: "🏖️",
      amenities: ["Beach", "Restaurant", "Bar"],
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      rating: 4.7,
      reviews: 654,
      price: 249,
      emoji: "⛰️",
      amenities: ["Ski", "Hot Tub", "Fireplace"],
    },
    {
      id: 4,
      name: "Urban Boutique Suites",
      location: "San Francisco, CA",
      rating: 4.6,
      reviews: 543,
      price: 199,
      emoji: "🌆",
      amenities: ["Gym", "Lounge", "Parking"],
    },
    {
      id: 5,
      name: "Tropical Paradise Inn",
      location: "Hawaii",
      rating: 4.9,
      reviews: 1023,
      price: 449,
      emoji: "🌺",
      amenities: ["Ocean View", "Spa", "Pool"],
    },
    {
      id: 6,
      name: "City Center Hotel",
      location: "Chicago, Illinois",
      rating: 4.5,
      reviews: 789,
      price: 179,
      emoji: "🏙️",
      amenities: ["WiFi", "Restaurant", "Gym"],
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Travel Blogger",
      comment:
        "Absolutely amazing experience! The booking process was seamless and the hotel exceeded all expectations. Will definitely use again!",
      rating: 5,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Traveler",
      comment:
        "Perfect for business trips. Great locations, professional service, and excellent amenities. Highly recommended!",
      rating: 5,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Vacation Enthusiast",
      comment:
        "Found the perfect resort for our family vacation. Easy booking, great prices, and beautiful properties!",
      rating: 5,
      avatar: "ER",
    },
  ];

  const handleSearch = () => {
    console.log("Searching...", {
      location,
      checkInDate,
      checkOutDate,
      guests,
    });
  };

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⭐</span>
              <span>Trusted by 50,000+ travelers worldwide</span>
            </div>

            <h1 className={styles.heroTitle}>
              Find Your Perfect
              <br />
              <span className={styles.gradientText}>Hotel Stay</span>
            </h1>

            <p className={styles.heroDescription}>
              Discover amazing hotels, resorts, and unique stays around the
              world. Book with confidence and enjoy unforgettable experiences.
            </p>

            {/* Search Box */}
            <div className={styles.searchBox}>
              <div className={styles.searchField}>
                <span className={styles.searchIcon}>📍</span>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className={styles.searchInput}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className={styles.searchField}>
                <span className={styles.searchIcon}>📅</span>
                <input
                  type="date"
                  placeholder="Check-in"
                  className={styles.searchInput}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              <div className={styles.searchField}>
                <span className={styles.searchIcon}>📅</span>
                <input
                  type="date"
                  placeholder="Check-out"
                  className={styles.searchInput}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>

              <div className={styles.searchField}>
                <span className={styles.searchIcon}>👥</span>
                <select
                  className={styles.searchInput}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              <button onClick={handleSearch} className={styles.ctaButton}>
                <span className={styles.buttonIcon}>🔍</span>
                Search
              </button>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Hotels</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50,000+</div>
                <div className={styles.statLabel}>Happy Guests</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4.9★</div>
                <div className={styles.statLabel}>Average Rating</div>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.hotelEmojiGrid}>
              <div className={styles.emojiCard}>🏨</div>
              <div className={styles.emojiCard}>🏖️</div>
              <div className={styles.emojiCard}>⛰️</div>
              <div className={styles.emojiCard}>🌆</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <p className={styles.sectionSubtitle}>
            Find the perfect accommodation type for your needs
          </p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${styles.categoryCard} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
              style={{ "--category-color": category.color }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={styles.categoryEmoji}>{category.emoji}</div>
              <div className={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Hotels</h2>
          <p className={styles.sectionSubtitle}>
            Hand-picked stays with exceptional quality
          </p>
        </div>

        <div className={styles.featuredGrid}>
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className={styles.featuredCard}>
              <div className={styles.cardImage}>
                <div className={styles.hotelEmoji}>{hotel.emoji}</div>
                <button className={styles.favoriteBtn}>❤️</button>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{hotel.name}</h3>
                <p className={styles.cardSubtitle}>{hotel.location}</p>

                <div className={styles.cardMeta}>
                  <div className={styles.rating}>
                    <span className={styles.starFilled}>⭐</span>
                    <span>{hotel.rating}</span>
                    <span className={styles.reviews}>
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className={styles.amenities}>
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className={styles.amenityBadge}>
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.price}>
                    <span className={styles.priceAmount}>${hotel.price}</span>
                    <span className={styles.priceLabel}>/night</span>
                  </div>
                  <button className={styles.bookButton}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>🔒</span>
          </div>
          <h3 className={styles.featureTitle}>Secure Booking</h3>
          <p className={styles.featureDescription}>
            Your safety is our priority. Book with confidence using our secure
            payment system.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>💎</span>
          </div>
          <h3 className={styles.featureTitle}>Best Price Guarantee</h3>
          <p className={styles.featureDescription}>
            Find the best deals and prices. We guarantee you won't find it
            cheaper elsewhere.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>🎯</span>
          </div>
          <h3 className={styles.featureTitle}>24/7 Support</h3>
          <p className={styles.featureDescription}>
            Our dedicated support team is always here to help you, anytime,
            anywhere.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Guests Say</h2>
          <p className={styles.sectionSubtitle}>
            Real experiences from real travelers
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.starFilled}>
                    ⭐
                  </span>
                ))}
              </div>
              <p className={styles.testimonialComment}>{testimonial.comment}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.promoBanner}>
        <div className={styles.promoContent}>
          <span className={styles.promoIcon}>🎉</span>
          <span className={styles.promoTag}>LIMITED TIME OFFER</span>
        </div>
        <h2 className={styles.promoTitle}>Save up to 30% on Your Next Stay!</h2>
        <p className={styles.promoDescription}>
          Book now and enjoy exclusive discounts on thousands of hotels
          worldwide. Don't miss out on this amazing opportunity!
        </p>
        <div className={styles.promoFeatures}>
          <div className={styles.promoFeature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Free Cancellation</span>
          </div>
          <div className={styles.promoFeature}>
            <span className={styles.featureIcon}>✓</span>
            <span>No Hidden Fees</span>
          </div>
          <div className={styles.promoFeature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Instant Confirmation</span>
          </div>
        </div>
        <div className={styles.promoActions}>
          <button className={styles.primaryButton}>
            <span className={styles.buttonIcon}>🔥</span>
            Claim Your Discount
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
        <p className={styles.ctaDescription}>
          Join thousands of satisfied travelers who have found their perfect
          stay with us. Your dream vacation is just a click away!
        </p>
        <button className={styles.primaryButton}>
          <span className={styles.buttonIcon}>✈️</span>
          Start Booking Now
        </button>
      </section>
    </div>
  );
};

export default UserHome;
