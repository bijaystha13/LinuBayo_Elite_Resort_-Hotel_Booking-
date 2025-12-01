"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Star,
  Users,
  Calendar,
  Heart,
  Grid,
  List,
  Mail,
  Check,
  Wifi,
  Coffee,
  Car,
  Utensils,
} from "lucide-react";
import styles from "./dealspage.module.css";

const DealsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);

  const filters = [
    { id: "all", label: "All Deals" },
    { id: "luxury", label: "Luxury" },
    { id: "budget", label: "Budget-Friendly" },
    { id: "family", label: "Family Packages" },
    { id: "romantic", label: "Romantic Getaways" },
  ];

  const deals = [
    {
      id: 1,
      title: "Luxury Beach Resort & Spa",
      location: "Maldives",
      emoji: "🏖️",
      originalPrice: 899,
      price: 599,
      discount: "35% OFF",
      rating: 4.9,
      reviews: 342,
      type: "luxury",
      features: ["Free WiFi", "Breakfast", "Pool"],
      validUntil: "Dec 31, 2024",
    },
    {
      id: 2,
      title: "Downtown Business Hotel",
      location: "New York, USA",
      emoji: "🏢",
      originalPrice: 350,
      price: 199,
      discount: "43% OFF",
      rating: 4.7,
      reviews: 567,
      type: "budget",
      features: ["Free Parking", "WiFi", "Gym"],
      validUntil: "Jan 15, 2025",
    },
    {
      id: 3,
      title: "Family Paradise Resort",
      location: "Orlando, Florida",
      emoji: "🎡",
      originalPrice: 450,
      price: 299,
      discount: "34% OFF",
      rating: 4.8,
      reviews: 891,
      type: "family",
      features: ["Kids Club", "Pool", "Restaurant"],
      validUntil: "Dec 25, 2024",
    },
    {
      id: 4,
      title: "Romantic Mountain Lodge",
      location: "Swiss Alps",
      emoji: "🏔️",
      originalPrice: 650,
      price: 449,
      discount: "31% OFF",
      rating: 5.0,
      reviews: 234,
      type: "romantic",
      features: ["Spa", "Fine Dining", "View"],
      validUntil: "Feb 14, 2025",
    },
    {
      id: 5,
      title: "Urban Boutique Hotel",
      location: "Tokyo, Japan",
      emoji: "🗾",
      originalPrice: 280,
      price: 169,
      discount: "40% OFF",
      rating: 4.6,
      reviews: 445,
      type: "budget",
      features: ["WiFi", "Breakfast", "Central"],
      validUntil: "Jan 31, 2025",
    },
    {
      id: 6,
      title: "Grand Palace Hotel",
      location: "Paris, France",
      emoji: "🗼",
      originalPrice: 799,
      price: 549,
      discount: "31% OFF",
      rating: 4.9,
      reviews: 678,
      type: "luxury",
      features: ["Spa", "Restaurant", "Concierge"],
      validUntil: "Dec 20, 2024",
    },
    {
      id: 7,
      title: "Desert Oasis Resort",
      location: "Dubai, UAE",
      emoji: "🏙️",
      originalPrice: 950,
      price: 649,
      discount: "32% OFF",
      rating: 4.8,
      reviews: 523,
      type: "luxury",
      features: ["Pool", "Spa", "Golf"],
      validUntil: "Jan 10, 2025",
    },
    {
      id: 8,
      title: "Cozy Countryside Inn",
      location: "Tuscany, Italy",
      emoji: "🍇",
      originalPrice: 320,
      price: 189,
      discount: "41% OFF",
      rating: 4.7,
      reviews: 312,
      type: "romantic",
      features: ["Wine Tour", "Breakfast", "Garden"],
      validUntil: "Dec 28, 2024",
    },
    {
      id: 9,
      title: "Adventure Family Lodge",
      location: "Banff, Canada",
      emoji: "🏔️",
      originalPrice: 420,
      price: 279,
      discount: "34% OFF",
      rating: 4.8,
      reviews: 456,
      type: "family",
      features: ["Skiing", "Pool", "Kids Menu"],
      validUntil: "Feb 28, 2025",
    },
  ];

  const filteredDeals =
    activeFilter === "all"
      ? deals
      : deals.filter((deal) => deal.type === activeFilter);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our deals newsletter!");
  };

  return (
    <div className={styles["deals-page"]}>
      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-background"]}>
          <div
            className={`${styles["gradient-orb"]} ${styles["gradient-orb-1"]}`}
          ></div>
          <div
            className={`${styles["gradient-orb"]} ${styles["gradient-orb-2"]}`}
          ></div>
        </div>

        <div className={styles["hero-content"]}>
          <div className={styles["hero-badge"]}>
            <Sparkles className={styles["badge-icon"]} />
            <span>Limited Time Offers</span>
          </div>

          <h1 className={styles["hero-title"]}>
            Unbeatable <span className={styles["gradient-text"]}>Deals</span> &
            Offers
          </h1>

          <p className={styles["hero-description"]}>
            Save up to 50% on luxury accommodations worldwide. Exclusive deals
            handpicked just for you. Book now before they&apos;re gone!
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles["filter-section"]}>
        <div className={styles["filter-container"]}>
          <div className={styles["filter-group"]}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`${styles["filter-button"]} ${
                  activeFilter === filter.id ? styles.active : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Grid Section */}
      <section className={styles["deals-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>
            {filteredDeals.length} Amazing Deals Available
          </h2>
          <div className={styles["view-toggle"]}>
            <button
              className={`${styles["toggle-button"]} ${
                viewMode === "grid" ? styles.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className={styles["toggle-icon"]} />
              Grid
            </button>
            <button
              className={`${styles["toggle-button"]} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className={styles["toggle-icon"]} />
              List
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid" ? styles["deals-grid"] : styles["deals-list"]
          }
        >
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className={`${styles["deal-card"]} ${
                viewMode === "list" ? styles["deal-card-list"] : ""
              }`}
            >
              <div className={styles["deal-badge"]}>{deal.discount}</div>

              <div className={styles["deal-image"]}>
                <span className={styles["hotel-emoji"]}>{deal.emoji}</span>
                <button
                  className={`${styles["favorite-button"]} ${
                    favorites.includes(deal.id) ? styles.favorited : ""
                  }`}
                  onClick={() => toggleFavorite(deal.id)}
                >
                  <Heart
                    className={styles["favorite-icon"]}
                    fill={favorites.includes(deal.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className={styles["deal-content"]}>
                <div className={styles["deal-header"]}>
                  <h3 className={styles["deal-title"]}>{deal.title}</h3>
                  <div className={styles["deal-location"]}>
                    <MapPin className={styles["location-icon"]} />
                    <span>{deal.location}</span>
                  </div>
                </div>

                <div className={styles["deal-features"]}>
                  {deal.features.map((feature, index) => (
                    <div key={index} className={styles["feature-item"]}>
                      <Check className={styles["feature-icon"]} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={styles["deal-footer"]}>
                  <div className={styles["price-section"]}>
                    <div className={styles["original-price"]}>
                      ${deal.originalPrice}
                    </div>
                    <div className={styles["deal-price"]}>
                      <span className={styles["price-amount"]}>
                        ${deal.price}
                      </span>
                      <span className={styles["price-label"]}>/night</span>
                    </div>
                  </div>
                  <button className={styles["book-button"]}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles["newsletter-section"]}>
        <div className={styles["newsletter-content"]}>
          <Mail className={styles["newsletter-icon"]} />
          <h2 className={styles["newsletter-title"]}>
            Never Miss a Deal Again
          </h2>
          <p className={styles["newsletter-description"]}>
            Subscribe to our newsletter and get exclusive deals delivered
            straight to your inbox. Be the first to know about flash sales and
            special offers!
          </p>
          <form
            className={styles["newsletter-form"]}
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles["newsletter-input"]}
              required
            />
            <button type="submit" className={styles["newsletter-button"]}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default DealsPage;
