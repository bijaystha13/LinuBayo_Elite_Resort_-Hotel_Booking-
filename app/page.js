"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Award,
  Heart,
  ArrowRight,
  Clock,
  DollarSign,
  Zap,
  Gift,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

const HotelBookingHome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDestination, setActiveDestination] = useState(0);
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    console.log("Searching with:", searchData);
  };

  const destinations = [
    { name: "Paris", emoji: "🗼", color: "#ff6b35" },
    { name: "Tokyo", emoji: "🗾", color: "#ffa500" },
    { name: "New York", emoji: "🗽", color: "#ff69b4" },
    { name: "Dubai", emoji: "🏙️", color: "#32cd32" },
    { name: "London", emoji: "🎡", color: "#ff1493" },
    { name: "Bali", emoji: "🏝️", color: "#00bfff" },
  ];

  const featuredHotels = [
    {
      id: 1,
      name: "Luxury Resort & Spa",
      location: "Bali, Indonesia",
      price: 299,
      rating: 5.0,
      reviews: 324,
      image: "🏨",
      type: "Resort",
    },
    {
      id: 2,
      name: "Grand Plaza Hotel",
      location: "New York, USA",
      price: 459,
      rating: 4.8,
      reviews: 892,
      image: "🏢",
      type: "Business",
    },
    {
      id: 3,
      name: "Beachfront Paradise",
      location: "Maldives",
      price: 599,
      rating: 4.9,
      reviews: 567,
      image: "🏖️",
      type: "Beach Resort",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      initial: "S",
      rating: 5.0,
      comment:
        "Amazing experience! The booking process was seamless and the hotel exceeded all expectations. The customer support team was incredibly helpful throughout my entire trip.",
    },
    {
      name: "Michael Chen",
      role: "Business Traveler",
      initial: "M",
      rating: 4.9,
      comment:
        "I use this platform for all my business trips. The best price guarantee has saved me thousands, and the flexible cancellation policy is a lifesaver for my unpredictable schedule.",
    },
    {
      name: "Emma Davis",
      role: "Adventure Seeker",
      initial: "E",
      rating: 5.0,
      comment:
        "Found the perfect beachfront resort for my honeymoon! The verified reviews helped us make the right choice. Everything was exactly as described. Highly recommend!",
    },
  ];

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-background"]}>
          <div
            className={`${styles["gradient-orb"]} ${styles["gradient-orb-1"]}`}
          ></div>
          <div
            className={`${styles["gradient-orb"]} ${styles["gradient-orb-2"]}`}
          ></div>
          <div
            className={`${styles["gradient-orb"]} ${styles["gradient-orb-3"]}`}
          ></div>
        </div>

        <div className={styles["hero-content"]}>
          <div className={styles["hero-text"]}>
            <div className={styles.badge}>
              <Award className={styles["badge-icon"]} />
              <span>Trusted by 500K+ Travelers</span>
            </div>

            <h1 className={styles["hero-title"]}>
              Find Your Perfect{" "}
              <span className={styles["gradient-text"]}>Stay</span> Anywhere
            </h1>

            <p className={styles["hero-description"]}>
              Experience luxury accommodations from premium hotels worldwide,
              delivered with exceptional service and unforgettable memories.
            </p>

            <div className={styles["search-box"]}>
              <div className={styles["search-field"]}>
                <MapPin className={styles["search-icon"]} />
                <input
                  type="text"
                  name="destination"
                  className={styles["search-input"]}
                  placeholder="Where are you going?"
                  value={searchData.destination}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles["search-field"]}>
                <Calendar className={styles["search-icon"]} />
                <input
                  type="date"
                  name="checkIn"
                  className={styles["search-input"]}
                  value={searchData.checkIn}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles["search-field"]}>
                <Calendar className={styles["search-icon"]} />
                <input
                  type="date"
                  name="checkOut"
                  className={styles["search-input"]}
                  value={searchData.checkOut}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles["search-field"]}>
                <Users className={styles["search-icon"]} />
                <select
                  name="guests"
                  className={styles["search-input"]}
                  value={searchData.guests}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              <button className={styles["cta-button"]} onClick={handleSearch}>
                <Search className={styles["button-icon"]} />
                Search Hotels
              </button>
            </div>

            <div className={styles["hero-stats"]}>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>10K+</span>
                <span className={styles["stat-label"]}>Happy Travelers</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>500+</span>
                <span className={styles["stat-label"]}>Luxury Hotels</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>4.9★</span>
                <span className={styles["stat-label"]}>Average Rating</span>
              </div>
            </div>
          </div>

          <div className={styles["hero-visual"]}>
            <div className={styles["hotel-emoji-grid"]}>
              <div className={styles["emoji-card"]}>🏨</div>
              <div className={styles["emoji-card"]}>🏖️</div>
              <div className={styles["emoji-card"]}>🗼</div>
              <div className={styles["emoji-card"]}>🏢</div>
              <div className={styles["emoji-card"]}>🏝️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles["promo-banner"]}>
        <div className={styles["promo-content"]}>
          <Sparkles className={styles["promo-icon"]} />
          <span className={styles["promo-tag"]}>LIMITED TIME OFFER</span>
        </div>
        <h2 className={styles["promo-title"]}>
          Get 50% OFF Your First Booking!
        </h2>
        <p className={styles["promo-description"]}>
          Join thousands of travelers. Register now for exclusive deals, faster
          booking, and real-time availability.
        </p>
        <div className={styles["promo-features"]}>
          <div className={styles["promo-feature"]}>
            <Zap className={styles["feature-icon"]} />
            <span>Instant booking</span>
          </div>
          <div className={styles["promo-feature"]}>
            <Gift className={styles["feature-icon"]} />
            <span>Exclusive deals</span>
          </div>
          <div className={styles["promo-feature"]}>
            <Award className={styles["feature-icon"]} />
            <span>Earn rewards</span>
          </div>
        </div>
        <div className={styles["promo-actions"]}>
          <button className={styles["primary-button"]}>
            Sign Up Now
            <ArrowRight className={styles["button-icon"]} />
          </button>
          <p className={styles["login-link"]}>
            Already have an account? <span>Sign In</span>
          </p>
        </div>

        <div className={styles["promo-mockup"]}>
          <div className={styles["mockup-card"]}>
            <div className={styles["mockup-header"]}>
              <span>🏨</span>
              <span>LuxuryStay</span>
            </div>
            <div className={styles["mockup-body"]}>
              <p>Book in seconds</p>
              <div className={styles["mockup-rating"]}>
                <Star className={styles["star-filled"]} />
                <span>4.9★ Rating</span>
              </div>
              <p>10K+ Bookings</p>
            </div>
            <div className={styles["mockup-badges"]}>
              <span className={styles["badge-pill"]}>50% OFF</span>
              <span className={styles["badge-pill"]}>Free Parking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className={styles["categories-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Popular Destinations</h2>
          <p className={styles["section-subtitle"]}>
            Discover your dream vacation spot
          </p>
        </div>

        <div className={styles["categories-grid"]}>
          {destinations.map((dest, index) => (
            <div
              key={index}
              className={`${styles["category-card"]} ${
                activeDestination === index ? styles.active : ""
              }`}
              onClick={() => setActiveDestination(index)}
              style={{ "--category-color": dest.color }}
            >
              <span className={styles["category-emoji"]}>{dest.emoji}</span>
              <span className={styles["category-name"]}>{dest.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles["features-section"]}>
        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon-wrapper"]}>
            <Clock className={styles["feature-icon"]} />
          </div>
          <h3 className={styles["feature-title"]}>Instant Booking</h3>
          <p className={styles["feature-description"]}>
            Reserve your room instantly with real-time availability and
            confirmation.
          </p>
        </div>

        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon-wrapper"]}>
            <DollarSign className={styles["feature-icon"]} />
          </div>
          <h3 className={styles["feature-title"]}>Best Price Guarantee</h3>
          <p className={styles["feature-description"]}>
            Find a lower price? We&apos;ll match it plus give you an extra
            discount.
          </p>
        </div>

        <div className={styles["feature-card"]}>
          <div className={styles["feature-icon-wrapper"]}>
            <Award className={styles["feature-icon"]} />
          </div>
          <h3 className={styles["feature-title"]}>Premium Quality</h3>
          <p className={styles["feature-description"]}>
            Only verified hotels with exceptional service and top-rated
            amenities.
          </p>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className={styles["featured-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Premium Selection</h2>
          <p className={styles["section-subtitle"]}>
            Handpicked by our travel experts
          </p>
        </div>

        <div className={styles["featured-grid"]}>
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className={styles["featured-card"]}>
              <div className={styles["card-image"]}>
                <span className={styles["hotel-emoji"]}>{hotel.image}</span>
                <button className={styles["favorite-btn"]}>
                  <Heart />
                </button>
              </div>
              <div className={styles["card-content"]}>
                <h3 className={styles["card-title"]}>{hotel.name}</h3>
                <p className={styles["card-subtitle"]}>by {hotel.type}</p>
                <div className={styles["card-meta"]}>
                  <div className={styles.rating}>
                    <Star className={styles["star-filled"]} />
                    <span>{hotel.rating}</span>
                  </div>
                  <div className={styles.location}>
                    <MapPin className={styles["location-icon"]} />
                    <span>{hotel.location}</span>
                  </div>
                </div>
                <div className={styles["card-footer"]}>
                  <div className={styles.price}>
                    <span className={styles["price-amount"]}>
                      ${hotel.price}
                    </span>
                    <span className={styles["price-label"]}>/night</span>
                  </div>
                  <button className={styles["book-button"]}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles["testimonials-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>What Travelers Say</h2>
          <p className={styles["section-subtitle"]}>
            Read reviews from our satisfied customers
          </p>
        </div>

        <div className={styles["testimonials-grid"]}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles["testimonial-card"]}>
              <div className={styles["testimonial-rating"]}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={styles["star-filled"]} />
                ))}
              </div>
              <p className={styles["testimonial-comment"]}>
                {testimonial.comment}
              </p>
              <div className={styles["testimonial-author"]}>
                <div className={styles["author-avatar"]}>
                  {testimonial.initial}
                </div>
                <div className={styles["author-info"]}>
                  <div className={styles["author-name"]}>
                    {testimonial.name}
                  </div>
                  <div className={styles["author-role"]}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles["final-cta"]}>
        <h2 className={styles["cta-title"]}>Ready to Book Your Stay?</h2>
        <p className={styles["cta-description"]}>
          Join thousands of travelers and experience luxury accommodations at
          unbeatable prices.
        </p>
        <button className={`${styles["primary-button"]} ${styles.large}`}>
          Explore Hotels
          <ArrowRight className={styles["button-icon"]} />
        </button>
      </section>
    </div>
  );
};

export default HotelBookingHome;
