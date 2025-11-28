"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  Check,
} from "lucide-react";
import styles from "./page.module.css";

const HotelBookingHome = () => {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    console.log("Searching with:", searchData);
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <Award className={styles.badgeIcon} />
              <span>Trusted by 500K+ Travelers</span>
            </div>

            <h1 className={styles.heroTitle}>
              Find Your Perfect <span className={styles.gradient}>Stay</span>{" "}
              Anywhere
            </h1>

            <p className={styles.heroDescription}>
              Discover and book amazing hotels worldwide. From luxury resorts to
              cozy boutique stays, find the perfect accommodation for your next
              adventure.
            </p>

            <div className={styles.searchBox}>
              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Where</label>
                <div style={{ position: "relative" }}>
                  <MapPin className={styles.searchIcon} />
                  <input
                    type="text"
                    name="destination"
                    className={styles.searchInput}
                    placeholder="Search destinations"
                    value={searchData.destination}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Check-in</label>
                <div style={{ position: "relative" }}>
                  <Calendar className={styles.searchIcon} />
                  <input
                    type="date"
                    name="checkIn"
                    className={styles.searchInput}
                    value={searchData.checkIn}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Check-out</label>
                <div style={{ position: "relative" }}>
                  <Calendar className={styles.searchIcon} />
                  <input
                    type="date"
                    name="checkOut"
                    className={styles.searchInput}
                    value={searchData.checkOut}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.searchField}>
                <label className={styles.searchLabel}>Guests</label>
                <div style={{ position: "relative" }}>
                  <Users className={styles.searchIcon} />
                  <select
                    name="guests"
                    className={styles.searchInput}
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
              </div>

              <button className={styles.ctaButton} onClick={handleSearch}>
                <Search className={styles.buttonIcon} />
                Search
              </button>
            </div>

            <div className={styles.heroFeatures}>
              <div className={styles.heroFeature}>
                <Check className={styles.checkIcon} />
                <span>Best Price Guarantee</span>
              </div>
              <div className={styles.heroFeature}>
                <Check className={styles.checkIcon} />
                <span>Free Cancellation</span>
              </div>
              <div className={styles.heroFeature}>
                <Check className={styles.checkIcon} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.mockupCard}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDot}></div>
                <div className={styles.mockupDot}></div>
                <div className={styles.mockupDot}></div>
              </div>

              <div className={styles.hotelPreview}>
                <div className={styles.hotelImage}>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                    }}
                  >
                    🏨
                  </div>
                </div>

                <div className={styles.hotelInfo}>
                  <div className={styles.hotelName}>Luxury Resort & Spa</div>
                  <div className={styles.hotelLocation}>
                    <MapPin style={{ width: "14px", height: "14px" }} />
                    Bali, Indonesia
                  </div>
                  <div className={styles.hotelRating}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={styles.starIcon} />
                    ))}
                    <span style={{ marginLeft: "8px", fontSize: "0.875rem" }}>
                      5.0 (324 reviews)
                    </span>
                  </div>
                  <div className={styles.hotelPrice}>
                    <span style={{ fontSize: "2rem", fontWeight: "800" }}>
                      $299
                    </span>
                    <span style={{ fontSize: "1rem", opacity: "0.7" }}>
                      /night
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Award />
            </div>
            <h3 className={styles.statNumber}>50K+</h3>
            <p className={styles.statLabel}>Hotels Worldwide</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users />
            </div>
            <h3 className={styles.statNumber}>2M+</h3>
            <p className={styles.statLabel}>Happy Travelers</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Star />
            </div>
            <h3 className={styles.statNumber}>4.9</h3>
            <p className={styles.statLabel}>Average Rating</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp />
            </div>
            <h3 className={styles.statNumber}>95%</h3>
            <p className={styles.statLabel}>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Book With Us</h2>
          <p className={styles.sectionDescription}>
            Experience hassle-free booking with exclusive benefits designed for
            modern travelers
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Award className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Best Price Guarantee</h3>
            <p className={styles.featureDescription}>
              Find a lower price? We&apos;ll match it and give you an additional
              discount. Your satisfaction is our priority.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Heart className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Easy Cancellation</h3>
            <p className={styles.featureDescription}>
              Plans change. Cancel for free up to 24 hours before check-in on
              most bookings. No hidden fees.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Users className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>24/7 Customer Support</h3>
            <p className={styles.featureDescription}>
              Our dedicated team is always here to help you, anytime, anywhere.
              Get instant assistance whenever you need it.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Star className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Verified Reviews</h3>
            <p className={styles.featureDescription}>
              Read honest reviews from real travelers. Make informed decisions
              based on authentic experiences.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <Wifi className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Premium Amenities</h3>
            <p className={styles.featureDescription}>
              Enjoy free WiFi, parking, breakfast and more at selected
              properties. Comfort and convenience included.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <MapPin className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Prime Locations</h3>
            <p className={styles.featureDescription}>
              Stay in the heart of the action. All our hotels are carefully
              selected for their convenient locations.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Destinations</h2>
          <p className={styles.sectionDescription}>
            Explore the world&apos;s most sought-after travel destinations
          </p>
        </div>

        <div className={styles.destinationsGrid}>
          {[
            { name: "Paris", count: "1,234", emoji: "🗼" },
            { name: "Tokyo", count: "987", emoji: "🗾" },
            { name: "New York", count: "2,156", emoji: "🗽" },
            { name: "Dubai", count: "1,543", emoji: "🏙️" },
            { name: "London", count: "1,876", emoji: "🎡" },
            { name: "Bali", count: "892", emoji: "🏝️" },
          ].map((dest, index) => (
            <div key={index} className={styles.destinationCard}>
              <div className={styles.destinationImage}>
                <div style={{ fontSize: "4rem" }}>{dest.emoji}</div>
              </div>
              <div className={styles.destinationOverlay}>
                <h3 className={styles.destinationName}>{dest.name}</h3>
                <p className={styles.destinationCount}>{dest.count} Hotels</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Travelers Say</h2>
          <p className={styles.sectionDescription}>
            Read reviews from our satisfied customers around the globe
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {[
            {
              name: "Sarah Johnson",
              role: "Travel Blogger",
              initial: "S",
              comment:
                "Amazing experience! The booking process was seamless and the hotel exceeded all expectations. The customer support team was incredibly helpful throughout my entire trip.",
            },
            {
              name: "Michael Chen",
              role: "Business Traveler",
              initial: "M",
              comment:
                "I use this platform for all my business trips. The best price guarantee has saved me thousands, and the flexible cancellation policy is a lifesaver for my unpredictable schedule.",
            },
            {
              name: "Emma Davis",
              role: "Adventure Seeker",
              initial: "E",
              comment:
                "Found the perfect beachfront resort for my honeymoon! The verified reviews helped us make the right choice. Everything was exactly as described. Highly recommend!",
            },
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <p className={styles.testimonialComment}>{testimonial.comment}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{testimonial.initial}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.ctaDescription}>
            Join millions of travelers who trust us to find their perfect stay.
            Book now and save up to 30% on your next adventure.
          </p>
          <button className={styles.primaryButton}>
            Get Started Today
            <ArrowRight className={styles.buttonIcon} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HotelBookingHome;
