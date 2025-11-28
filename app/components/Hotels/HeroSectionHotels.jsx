"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";
// import styles from "./HeroSectionHotels.module.css";

const HeroSectionHotels = ({ selectedCountry }) => {
  const getCountryDisplay = () => {
    if (!selectedCountry || selectedCountry === "all") {
      return "Worldwide";
    }
    return selectedCountry;
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Discover Your <span className={styles.gradient}>Perfect Hotel</span>
          {selectedCountry && selectedCountry !== "all" && (
            <span className={styles.countrySubtitle}>
              {" "}
              in {selectedCountry}
            </span>
          )}
        </h1>
        <p className={styles.heroDescription}>
          Browse through thousands of hotels{" "}
          {selectedCountry && selectedCountry !== "all"
            ? `in ${selectedCountry}`
            : "worldwide"}{" "}
          and find the perfect accommodation for your next trip
        </p>

        <div className={styles.searchBar}>
          <div className={styles.searchField}>
            <MapPin className={styles.searchIcon} />
            <input
              type="text"
              placeholder={`Search hotels in ${getCountryDisplay()}...`}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.searchButton}>
            <Search className={styles.buttonIcon} />
            Search Hotels
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionHotels;
