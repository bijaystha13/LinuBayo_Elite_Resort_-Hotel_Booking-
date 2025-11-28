"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Car,
  Heart,
  ChevronDown,
  SlidersHorizontal,
  X,
  Calendar,
  Users,
} from "lucide-react";
import styles from "./luxuryhotels.module.css";

const HotelsPage = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    hotelType: "all",
    country: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    rooms: 1,
  });

  // Read selected country from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedCountry = localStorage.getItem("selectedCountry");
      if (selectedCountry) {
        setFilters((prev) => ({ ...prev, country: selectedCountry }));
        setSearchParams((prev) => ({ ...prev, location: selectedCountry }));
        localStorage.removeItem("selectedCountry");
      }
    }
  }, []);

  // Extended hotels data with countries
  const hotels = [
    {
      id: 1,
      name: "Tokyo Imperial Hotel",
      location: "Tokyo, Japan",
      country: "Japan",
      image: "🗼",
      rating: 4.9,
      reviews: 2540,
      price: 299,
      originalPrice: 399,
      amenities: ["Wifi", "Pool", "Restaurant", "Spa"],
      type: "luxury",
      description:
        "Luxury hotel in the heart of Tokyo with stunning city views",
    },
    {
      id: 2,
      name: "Bali Beach Resort",
      location: "Seminyak, Bali",
      country: "Indonesia",
      image: "🏝️",
      rating: 4.8,
      reviews: 3120,
      price: 189,
      originalPrice: 250,
      amenities: ["Wifi", "Beach", "Restaurant", "Spa"],
      type: "resort",
      description: "Tropical paradise with stunning beaches and rice terraces",
    },
    {
      id: 3,
      name: "Bangkok Grand Palace Hotel",
      location: "Bangkok, Thailand",
      country: "Thailand",
      image: "🛕",
      rating: 4.7,
      reviews: 2890,
      price: 149,
      originalPrice: 200,
      amenities: ["Wifi", "Pool", "Restaurant", "Parking"],
      type: "luxury",
      description: "Vibrant hotel near golden temples and bustling markets",
    },
    {
      id: 4,
      name: "Marina Bay Hotel",
      location: "Singapore",
      country: "Singapore",
      image: "🏙️",
      rating: 4.9,
      reviews: 2150,
      price: 350,
      originalPrice: 450,
      amenities: ["Wifi", "Pool", "Restaurant", "Spa"],
      type: "luxury",
      description:
        "Modern luxury with futuristic architecture and rooftop pool",
    },
    {
      id: 5,
      name: "Seoul Palace Hotel",
      location: "Seoul, South Korea",
      country: "South Korea",
      image: "🏯",
      rating: 4.8,
      reviews: 1960,
      price: 199,
      originalPrice: 280,
      amenities: ["Wifi", "Restaurant", "Spa", "Parking"],
      type: "boutique",
      description: "Traditional meets modern in the heart of Seoul",
    },
    {
      id: 6,
      name: "Maldives Water Villa Resort",
      location: "Maldives",
      country: "Maldives",
      image: "🏖️",
      rating: 5.0,
      reviews: 1540,
      price: 699,
      originalPrice: 850,
      amenities: ["Wifi", "Beach", "Pool", "Restaurant", "Spa"],
      type: "resort",
      description: "Luxury overwater villas with crystal-clear waters",
    },
    {
      id: 7,
      name: "Hong Kong Harbour Hotel",
      location: "Hong Kong, China",
      country: "China",
      image: "🌃",
      rating: 4.7,
      reviews: 2340,
      price: 259,
      originalPrice: 340,
      amenities: ["Wifi", "Restaurant", "Parking"],
      type: "luxury",
      description: "Stunning harbour views and world-class dining",
    },
    {
      id: 8,
      name: "Hanoi Heritage Hotel",
      location: "Hanoi, Vietnam",
      country: "Vietnam",
      image: "🏞️",
      rating: 4.6,
      reviews: 1780,
      price: 99,
      originalPrice: 150,
      amenities: ["Wifi", "Restaurant", "Parking"],
      type: "boutique",
      description: "Colonial charm meets Vietnamese hospitality",
    },
    {
      id: 9,
      name: "Kyoto Ryokan Inn",
      location: "Kyoto, Japan",
      country: "Japan",
      image: "⛩️",
      rating: 4.9,
      reviews: 1890,
      price: 249,
      originalPrice: 320,
      amenities: ["Wifi", "Restaurant", "Hot Spring", "Traditional"],
      type: "boutique",
      description: "Traditional Japanese inn with hot spring baths",
    },
    {
      id: 10,
      name: "Ubud Jungle Resort",
      location: "Ubud, Bali",
      country: "Indonesia",
      image: "🌴",
      rating: 4.8,
      reviews: 2120,
      price: 169,
      originalPrice: 230,
      amenities: ["Wifi", "Pool", "Restaurant", "Yoga"],
      type: "resort",
      description: "Serene jungle retreat with infinity pool and yoga pavilion",
    },
  ];

  // Filter hotels based on selected country
  const filteredHotels = hotels.filter((hotel) => {
    if (filters.country === "all") return true;
    return hotel.country === filters.country;
  });

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleFavorite = (hotelId) => {
    setFavorites((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  const uniqueCountries = ["all", ...new Set(hotels.map((h) => h.country))];

  return (
    <div className={styles.hotelsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Your <span className={styles.gradient}>Perfect Hotel</span>
            {filters.country !== "all" && (
              <span className={styles.countryTitle}> in {filters.country}</span>
            )}
          </h1>
          <p className={styles.heroDescription}>
            Browse through thousands of hotels
            {filters.country !== "all"
              ? ` in ${filters.country}`
              : " worldwide"}{" "}
            and find the perfect accommodation for your next trip
          </p>

          {/* Enhanced Search Bar */}
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
              <div className={styles.searchField}>
                <MapPin className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.searchDivider}></div>

              <div className={styles.searchField}>
                <Calendar className={styles.searchIcon} />
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkIn: e.target.value,
                    })
                  }
                  placeholder="Check-in"
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.searchDivider}></div>

              <div className={styles.searchField}>
                <Calendar className={styles.searchIcon} />
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkOut: e.target.value,
                    })
                  }
                  placeholder="Check-out"
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.searchDivider}></div>

              <div className={styles.searchField}>
                <Users className={styles.searchIcon} />
                <select
                  value={`${searchParams.adults}-${searchParams.children}-${searchParams.rooms}`}
                  onChange={(e) => {
                    const [adults, children, rooms] = e.target.value.split("-");
                    setSearchParams({
                      ...searchParams,
                      adults: parseInt(adults),
                      children: parseInt(children),
                      rooms: parseInt(rooms),
                    });
                  }}
                  className={styles.searchInput}
                >
                  <option value="1-0-1">1 adult · 0 children · 1 room</option>
                  <option value="2-0-1">2 adults · 0 children · 1 room</option>
                  <option value="2-1-1">2 adults · 1 child · 1 room</option>
                  <option value="2-2-1">2 adults · 2 children · 1 room</option>
                  <option value="3-0-2">3 adults · 0 children · 2 rooms</option>
                  <option value="4-0-2">4 adults · 0 children · 2 rooms</option>
                </select>
              </div>

              <button className={styles.searchButton}>
                <Search className={styles.buttonIcon} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {/* Filters Sidebar */}
          <aside
            className={`${styles.filterSidebar} ${
              showFilters ? styles.showFilters : ""
            }`}
          >
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Filters</h3>
              <button
                className={styles.closeFilters}
                onClick={() => setShowFilters(false)}
              >
                <X />
              </button>
            </div>

            {/* Country Filter */}
            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Country</h4>
              <div className={styles.filterOptions}>
                {uniqueCountries.map((country) => (
                  <label key={country} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="country"
                      checked={filters.country === country}
                      onChange={() =>
                        setFilters((prev) => ({ ...prev, country }))
                      }
                    />
                    <span>{country === "all" ? "All Countries" : country}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Price Range</h4>
              <div className={styles.priceRange}>
                <span>${filters.priceRange[0]}</span>
                <span>-</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Hotel Type</h4>
              <div className={styles.filterOptions}>
                {[
                  "All",
                  "Luxury",
                  "Boutique",
                  "Budget",
                  "Resort",
                  "Business",
                ].map((type) => (
                  <label key={type} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="hotelType"
                      defaultChecked={type === "All"}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Rating</h4>
              <div className={styles.filterOptions}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className={styles.filterOption}>
                    <input type="checkbox" />
                    <span className={styles.ratingOption}>
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className={styles.starIconSmall} />
                      ))}
                      & up
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterSectionTitle}>Amenities</h4>
              <div className={styles.filterOptions}>
                {[
                  "Free WiFi",
                  "Pool",
                  "Restaurant",
                  "Spa",
                  "Parking",
                  "Beach Access",
                ].map((amenity) => (
                  <label key={amenity} className={styles.filterOption}>
                    <input type="checkbox" />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className={styles.applyFilters}>Apply Filters</button>
          </aside>

          {/* Hotels Grid */}
          <div className={styles.hotelsSection}>
            <div className={styles.resultsHeader}>
              <div className={styles.resultsInfo}>
                <h2 className={styles.resultsTitle}>
                  {filters.country !== "all"
                    ? `Hotels in ${filters.country}`
                    : "Available Hotels"}
                </h2>
                <p className={styles.resultsCount}>
                  {sortedHotels.length} properties found
                </p>
              </div>

              <div className={styles.resultsActions}>
                <button
                  className={styles.filterButton}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className={styles.buttonIcon} />
                  Filters
                </button>

                <div className={styles.sortDropdown}>
                  <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className={styles.dropdownIcon} />
                </div>
              </div>
            </div>

            <div className={styles.hotelsGrid}>
              {sortedHotels.map((hotel) => (
                <div key={hotel.id} className={styles.hotelCard}>
                  <div className={styles.hotelImageWrapper}>
                    <div className={styles.hotelImage}>
                      <div className={styles.hotelEmoji}>{hotel.image}</div>
                    </div>
                    <button
                      className={`${styles.favoriteBtn} ${
                        favorites.includes(hotel.id)
                          ? styles.favoriteActive
                          : ""
                      }`}
                      onClick={() => toggleFavorite(hotel.id)}
                    >
                      <Heart className={styles.heartIcon} />
                    </button>
                    {hotel.originalPrice > hotel.price && (
                      <div className={styles.discountBadge}>
                        {Math.round(
                          ((hotel.originalPrice - hotel.price) /
                            hotel.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  <div className={styles.hotelContent}>
                    <div className={styles.hotelHeader}>
                      <h3 className={styles.hotelName}>{hotel.name}</h3>
                      <div className={styles.hotelRating}>
                        <Star className={styles.starIcon} />
                        <span className={styles.ratingValue}>
                          {hotel.rating}
                        </span>
                        <span className={styles.reviewCount}>
                          ({hotel.reviews})
                        </span>
                      </div>
                    </div>

                    <div className={styles.hotelLocation}>
                      <MapPin className={styles.locationIcon} />
                      <span>{hotel.location}</span>
                    </div>

                    <p className={styles.hotelDescription}>
                      {hotel.description}
                    </p>

                    <div className={styles.hotelAmenities}>
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className={styles.amenityTag}>
                          {amenity === "Wifi" && (
                            <Wifi className={styles.amenityIcon} />
                          )}
                          {amenity === "Restaurant" && (
                            <Utensils className={styles.amenityIcon} />
                          )}
                          {amenity === "Parking" && (
                            <Car className={styles.amenityIcon} />
                          )}
                          {amenity === "Pool" && "🏊"}
                          {amenity === "Beach" && "🏖️"}
                          {amenity === "Spa" && "💆"}
                          {amenity === "Hot Spring" && "♨️"}
                          {amenity === "Traditional" && "🏯"}
                          {amenity === "Yoga" && "🧘"}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className={styles.hotelFooter}>
                      <div className={styles.hotelPrice}>
                        {hotel.originalPrice > hotel.price && (
                          <span className={styles.originalPrice}>
                            ${hotel.originalPrice}
                          </span>
                        )}
                        <div className={styles.currentPrice}>
                          <span className={styles.priceAmount}>
                            ${hotel.price}
                          </span>
                          <span className={styles.priceLabel}>/night</span>
                        </div>
                      </div>
                      <button className={styles.viewButton}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedHotels.length === 0 && (
              <div className={styles.noResults}>
                <p>No hotels found in {filters.country}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;
