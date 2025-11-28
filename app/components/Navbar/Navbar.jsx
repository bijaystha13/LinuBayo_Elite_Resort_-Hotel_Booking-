"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Globe,
} from "lucide-react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when closing menu
    if (isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <div className={styles.topBarItem}>
              <Phone className={styles.topBarIcon} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className={styles.topBarItem}>
              <Mail className={styles.topBarIcon} />
              <span>support@hotelbook.com</span>
            </div>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.topBarItem}>
              <MapPin className={styles.topBarIcon} />
              <span>Find Hotels Near You</span>
            </div>
            <button className={styles.languageBtn}>
              <Globe className={styles.topBarIcon} />
              <span>EN</span>
              <ChevronDown className={styles.chevronIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
              <div className={styles.logoIcon}>🏨</div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>HotelBook</span>
                <span className={styles.logoTagline}>Your Perfect Stay</span>
              </div>
            </Link>
          </div>

          {/* Apply mobileMenuOpen to navCenter */}
          <div
            className={`${styles.navCenter} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
          >
            <ul className={styles.navLinks}>
              <li className={styles.navItem}>
                <Link
                  href="/"
                  className={`${styles.navLink} ${
                    isActive("/") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Home
                  {isActive("/") && (
                    <span className={styles.activeCircle}></span>
                  )}
                </Link>
              </li>

              <li className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    isActive("/destinations") ? styles.activeLink : ""
                  }`}
                  onClick={() => toggleDropdown("destinations")}
                >
                  Destinations
                  <ChevronDown className={styles.chevronIcon} />
                </button>
                <div
                  className={`${styles.dropdown} ${
                    activeDropdown === "destinations"
                      ? styles.dropdownActive
                      : ""
                  }`}
                >
                  <div className={styles.dropdownContent}>
                    <Link
                      href="/destinations/asia"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🗾</span>
                      <div>
                        <div className={styles.dropdownTitle}>Asia</div>
                        <div className={styles.dropdownDesc}>
                          Explore exotic destinations
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/destinations/europe"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🗼</span>
                      <div>
                        <div className={styles.dropdownTitle}>Europe</div>
                        <div className={styles.dropdownDesc}>
                          Historic cities & culture
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/destinations/america"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🗽</span>
                      <div>
                        <div className={styles.dropdownTitle}>Americas</div>
                        <div className={styles.dropdownDesc}>
                          Adventure awaits
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/destinations/africa"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🦁</span>
                      <div>
                        <div className={styles.dropdownTitle}>Africa</div>
                        <div className={styles.dropdownDesc}>
                          Safari & beaches
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>

              <li className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    isActive("/hotels") ? styles.activeLink : ""
                  }`}
                  onClick={() => toggleDropdown("hotels")}
                >
                  Hotels
                  <ChevronDown className={styles.chevronIcon} />
                </button>
                <div
                  className={`${styles.dropdown} ${
                    activeDropdown === "hotels" ? styles.dropdownActive : ""
                  }`}
                >
                  <div className={styles.dropdownContent}>
                    <Link
                      href="/hotels/luxury"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>⭐</span>
                      <div>
                        <div className={styles.dropdownTitle}>
                          Luxury Hotels
                        </div>
                        <div className={styles.dropdownDesc}>
                          5-star premium stays
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/hotels/boutique"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🏛️</span>
                      <div>
                        <div className={styles.dropdownTitle}>
                          Boutique Hotels
                        </div>
                        <div className={styles.dropdownDesc}>
                          Unique & stylish
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/hotels/budget"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>💰</span>
                      <div>
                        <div className={styles.dropdownTitle}>
                          Budget Friendly
                        </div>
                        <div className={styles.dropdownDesc}>
                          Affordable comfort
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/hotels/resorts"
                      className={styles.dropdownItem}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.dropdownIcon}>🏝️</span>
                      <div>
                        <div className={styles.dropdownTitle}>
                          Beach Resorts
                        </div>
                        <div className={styles.dropdownDesc}>
                          Oceanfront paradise
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>

              <li className={styles.navItem}>
                <Link
                  href="/deals"
                  className={`${styles.navLink} ${
                    isActive("/deals") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Deals
                  <span className={styles.dealsBadge}>Hot</span>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link
                  href="/about"
                  className={`${styles.navLink} ${
                    isActive("/about") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link
                  href="/contact"
                  className={`${styles.navLink} ${
                    isActive("/contact") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.navRight}>
            <button className={styles.searchBtn}>
              <Search className={styles.searchIcon} />
            </button>

            <Link href="/login" className={styles.signInBtn}>
              Log In
            </Link>

            <Link href="/signup" className={styles.signUpBtn}>
              Sign Up
            </Link>

            <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className={styles.menuIcon} />
              ) : (
                <Menu className={styles.menuIcon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay with active class - render always but control visibility with CSS */}
      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.active : ""}`}
        onClick={toggleMobileMenu}
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
      ></div>
    </nav>
  );
};

export default Navbar;
