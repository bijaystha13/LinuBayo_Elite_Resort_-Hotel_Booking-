"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  SlidersHorizontal,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import styles from "./hotelspage.module.css";
import HotelsGrid from "../components/Hotels/HotelsGrid";
import { useHttp } from "../shared/hooks/useHttpHook";

export default function HotelListPage() {
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hotelsPerPage: 12,
  });

  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  const [filters, setFilters] = useState({
    type: "",
    city: "",
    country: "",
    minPrice: "",
    maxPrice: "",
    featured: "",
    minRating: "",
    page: 1,
    limit: 12,
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [activeCategory, setActiveCategory] = useState("All Destinations");

  // Convert sort value to API format
  const getSortValue = (sort) => {
    const sortMap = {
      recommended: "rating-desc",
      "price-low": "price-asc",
      "price-high": "price-desc",
      rating: "rating-desc",
    };
    return sortMap[sort] || "rating-desc";
  };

  // Build query string from filters
  const buildQueryString = () => {
    const params = {
      ...filters,
      sort: getSortValue(sortBy),
    };

    // Remove empty values
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === undefined
      ) {
        delete params[key];
      }
    });

    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
  };

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      const queryString = buildQueryString();
      const data = await sendRequest(`/hotels${queryString}`);

      if (data.success) {
        setHotels(data.data);
        setTotalHotels(data.pagination.totalHotels);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  // Fetch hotels on component mount and when filters change
  useEffect(() => {
    fetchHotels();
  }, [filters, sortBy]);

  // useEffect(() => {
  //   fetchHotels();
  // }, [JSON.stringify(filters), sortBy]);

  // Handle search
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      city: searchParams.location,
      page: 1,
    }));
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    const categoryMap = {
      "All Destinations": "",
      Beach: "Beach Hotel",
      Mountain: "Mountain Lodge",
      City: "City Hotel",
      Historic: "Boutique Hotel",
    };

    setFilters((prev) => ({
      ...prev,
      type: categoryMap[category],
      page: 1,
    }));
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle explore (navigate to hotel details)
  const handleExplore = (hotelId) => {
    console.log("Exploring hotel:", hotelId);
    // Add your navigation logic here, e.g.:
    // router.push(`/hotels/${hotelId}`);
  };

  const filterCategories = [
    "All Destinations",
    "Beach",
    "Mountain",
    "City",
    "Historic",
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <div className={styles.badge}>
              <TrendingUp className={styles.badgeIcon} />
              <span>Explore {totalHotels}+ hotels worldwide</span>
            </div>

            <h1 className={styles.title}>
              Find Your Perfect Stay
              <span className={styles.titleGradient}>
                Anywhere in the World
              </span>
            </h1>

            <p className={styles.subtitle}>
              Discover amazing hotels, resorts, and unique accommodations across
              the globe at unbeatable prices
            </p>
          </div>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <div className={styles.searchField}>
                <MapPin className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Where to?"
                  className={styles.searchInput}
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.searchField}>
                <Calendar className={styles.searchIcon} />
                <input
                  type="date"
                  className={styles.searchInput}
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkIn: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.searchField}>
                <Calendar className={styles.searchIcon} />
                <input
                  type="date"
                  className={styles.searchInput}
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkOut: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.searchField}>
                <Users className={styles.searchIcon} />
                <select
                  className={styles.searchInput}
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
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

              <button
                className={styles.searchButton}
                onClick={handleSearch}
                disabled={isLoading}
              >
                <Search className={styles.buttonIcon} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.mainSection}>
        {/* Error Message */}
        {error && (
          <div className={styles.errorContainer}>
            <AlertCircle className={styles.errorIcon} />
            <p className={styles.errorText}>{error}</p>
            <button
              className={styles.retryButton}
              onClick={() => {
                clearError();
                fetchHotels();
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className={styles.filtersBar}>
          <div>
            <h2 className={styles.resultsTitle}>{totalHotels} Hotels Found</h2>
            <p className={styles.resultsSubtitle}>
              Best hotels around the world
            </p>
          </div>

          <div className={styles.controlsGroup}>
            <button className={styles.filterButton}>
              <SlidersHorizontal className={styles.filterIcon} />
              Filters
            </button>

            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              disabled={isLoading}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.categoryFilters}>
          {filterCategories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryActive : ""
              }`}
              onClick={() => handleCategoryChange(category)}
              disabled={isLoading}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} />
            <p className={styles.loadingText}>Loading hotels...</p>
          </div>
        )}

        {/* Hotels Grid */}
        {!isLoading && !error && hotels.length > 0 && (
          <>
            <HotelsGrid destinations={hotels} onExplore={handleExplore} />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1 || isLoading}
                >
                  Previous
                </button>

                <div className={styles.paginationInfo}>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>

                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={
                    pagination.currentPage === pagination.totalPages ||
                    isLoading
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!isLoading && !error && hotels.length === 0 && (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              No hotels found matching your criteria
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                setFilters({
                  type: "",
                  city: "",
                  country: "",
                  minPrice: "",
                  maxPrice: "",
                  featured: "",
                  minRating: "",
                  page: 1,
                  limit: 12,
                });
                setActiveCategory("All Destinations");
                setSearchParams({
                  location: "",
                  checkIn: "",
                  checkOut: "",
                  guests: 2,
                });
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
