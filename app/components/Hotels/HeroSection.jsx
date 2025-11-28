"use client";

import React from "react";
import { Star, Plane, Hotel } from "lucide-react";
import styles from "./HeroSection.module.css";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroTextContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <a href="/destinations">Destinations</a>
            <span>/</span>
            <span>Asia</span>
          </div>

          <h1 className={styles.heroTitle}>
            Discover <span className={styles.gradient}>Asia</span>
          </h1>
          <p className={styles.heroDescription}>
            From ancient temples to modern metropolises, tropical islands to
            bustling cities. Experience the incredible diversity of the
            world&apos;s largest continent.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <Plane className={styles.statIcon} />
              <div>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Destinations</div>
              </div>
            </div>
            <div className={styles.heroStat}>
              <Hotel className={styles.statIcon} />
              <div>
                <div className={styles.statNumber}>8.5K+</div>
                <div className={styles.statLabel}>Hotels</div>
              </div>
            </div>
            <div className={styles.heroStat}>
              <Star className={styles.statIcon} />
              <div>
                <div className={styles.statNumber}>4.8</div>
                <div className={styles.statLabel}>Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroImageSection}>
          <div className={styles.floatingCard}>
            <div className={styles.cardEmoji}>🗾</div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>Explore Asia</div>
              <div className={styles.cardSubtitle}>
                50+ Amazing Destinations
              </div>
              <div className={styles.cardRating}>
                <Star className={styles.cardStar} />
                <Star className={styles.cardStar} />
                <Star className={styles.cardStar} />
                <Star className={styles.cardStar} />
                <Star className={styles.cardStar} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
