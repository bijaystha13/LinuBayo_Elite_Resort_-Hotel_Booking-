"use client";

import React from "react";
import { MapPin, Hotel, Users, Star } from "lucide-react";
import styles from "./StatsSection.module.css";

const StatsSection = () => {
  const statistics = [
    { icon: <MapPin />, value: "50+", label: "Cities & Islands" },
    { icon: <Hotel />, value: "8,500+", label: "Hotels Available" },
    { icon: <Users />, value: "2M+", label: "Happy Travelers" },
    { icon: <Star />, value: "4.8", label: "Average Rating" },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        {statistics.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIconWrapper}>{stat.icon}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
