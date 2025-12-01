"use client";

import React from "react";
import styles from "./aboutpage.module.css";
import {
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
  Star,
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    { number: "10M+", label: "Happy Travelers", icon: Users },
    { number: "50K+", label: "Hotels Worldwide", icon: MapPin },
    { number: "150+", label: "Countries Covered", icon: Globe },
    { number: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers. Your satisfaction and experience are our top priorities.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We implement the highest security standards to protect your personal information and ensure safe transactions.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously evolve our platform with cutting-edge technology to provide the best booking experience.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Access to accommodations worldwide, from bustling cities to remote paradises, all in one platform.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      initials: "SJ",
      color: "#667eea",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      initials: "MC",
      color: "#764ba2",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      initials: "ER",
      color: "#f093fb",
    },
    {
      name: "David Kim",
      role: "VP of Operations",
      initials: "DK",
      color: "#4facfe",
    },
    {
      name: "Lisa Thompson",
      role: "Head of Marketing",
      initials: "LT",
      color: "#f5576c",
    },
    {
      name: "James Wilson",
      role: "Head of Partnerships",
      initials: "JW",
      color: "#00f2fe",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to revolutionize hotel bookings",
    },
    {
      year: "2019",
      title: "1M Users",
      description: "Reached our first million happy travelers",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Extended services to over 100 countries",
    },
    {
      year: "2023",
      title: "10M+ Bookings",
      description: "Celebrated 10 million successful reservations",
    },
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Background Orbs */}
      <div className={styles.background}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles className={styles.badgeIcon} />
            <span>About Us</span>
          </div>
          <h1 className={styles.heroTitle}>
            Making Travel <span className={styles.gradient}>Simple</span> &{" "}
            <span className={styles.gradient}>Accessible</span>
          </h1>
          <p className={styles.heroDescription}>
            We&apos;re on a mission to transform the way people discover and
            book accommodations worldwide. With cutting-edge technology and a
            passion for hospitality, we connect millions of travelers with their
            perfect stay, creating unforgettable experiences one booking at a
            time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <stat.icon />
              </div>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>
              <Target />
            </div>
            <h2 className={styles.missionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              To empower travelers worldwide by providing seamless access to
              quality accommodations at the best prices. We believe everyone
              deserves a great place to stay, whether they&apos;re traveling for
              business, leisure, or adventure.
            </p>
          </div>

          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>
              <TrendingUp />
            </div>
            <h2 className={styles.missionTitle}>Our Vision</h2>
            <p className={styles.missionText}>
              To become the world&apos;s most trusted travel companion,
              revolutionizing the hospitality industry through innovation,
              transparency, and exceptional customer service. We envision a
              future where booking the perfect stay is effortless and inspiring.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionDescription}>
            The principles that guide everything we do
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <value.icon />
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyContent}>
            <div className={styles.storyBadge}>
              <Clock />
              <span>Our Journey</span>
            </div>
            <h2 className={styles.storyTitle}>How It All Started</h2>
            <p className={styles.storyText}>
              Founded in 2018 by a team of travel enthusiasts and tech
              innovators, our journey began with a simple observation: booking
              hotels shouldn&apos;t be complicated, expensive, or stressful. We
              saw travelers struggling with confusing interfaces, hidden fees,
              and limited options.
            </p>
            <p className={styles.storyText}>
              That&apos;s when we decided to create something different. We
              built a platform that prioritizes transparency, simplicity, and
              value. Starting with just a handful of partner hotels, we&apos;ve
              grown to become a global platform trusted by millions, offering
              access to over 50,000 properties in 150+ countries.
            </p>
            <p className={styles.storyText}>
              Today, we&apos;re proud to be at the forefront of travel
              technology, continuously innovating to make your booking
              experience better, faster, and more rewarding. But our core
              mission remains the same: helping you find your perfect stay,
              wherever your journey takes you.
            </p>
          </div>

          <div className={styles.storyVisual}>
            <div className={styles.visualCard}>
              <div className={styles.visualIcon}>
                <Award />
              </div>
              <h3 className={styles.visualTitle}>Award Winning</h3>
              <p className={styles.visualText}>
                Recognized as the Best Travel Platform 2023
              </p>
            </div>

            <div className={styles.visualCard}>
              <div className={styles.visualIcon}>
                <Users />
              </div>
              <h3 className={styles.visualTitle}>Global Team</h3>
              <p className={styles.visualText}>
                500+ passionate employees across 20 countries
              </p>
            </div>

            <div className={styles.visualCard}>
              <div className={styles.visualIcon}>
                <Heart />
              </div>
              <h3 className={styles.visualTitle}>Customer Love</h3>
              <p className={styles.visualText}>
                98% customer satisfaction rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Milestones</h2>
          <p className={styles.sectionDescription}>
            Key moments that shaped our journey
          </p>
        </div>

        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{milestone.year}</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                <p className={styles.timelineDescription}>
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
          <p className={styles.sectionDescription}>
            The passionate team driving our vision forward
          </p>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div
                className={styles.teamAvatar}
                style={{
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}dd)`,
                }}
              >
                {member.initials}
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Join Us on This Journey</h2>
          <p className={styles.ctaDescription}>
            Whether you&apos;re looking for your next adventure or want to be
            part of our growing team, we&apos;d love to hear from you.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              <Users className={styles.buttonIcon} />
              View Careers
            </button>
            <button className={styles.secondaryButton}>
              <Heart className={styles.buttonIcon} />
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
