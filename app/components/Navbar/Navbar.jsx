"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronDown,
} from "lucide-react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
              <ChevronDown className={styles.topBarIcon} />
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

          {/* Overlay */}
          {isMobileMenuOpen && (
            <div
              className={`${styles.overlay} ${styles.active}`}
              onClick={toggleMobileMenu}
            ></div>
          )}

          {/* Navigation Links */}
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
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link
                  href="/hotels"
                  className={`${styles.navLink} ${
                    isActive("/hotels") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Hotels
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link
                  href="/destinations"
                  className={`${styles.navLink} ${
                    isActive("/destinations") ? styles.activeLink : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Destinations
                </Link>
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
                  About
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

              {/* Mobile Login Button */}
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <Link
                  href="/login"
                  className={styles.mobileLoginBtn}
                  onClick={closeMobileMenu}
                >
                  Log In
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
    </nav>
  );
};

export default Navbar;
