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
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  Hotel,
  CalendarCheck,
  TrendingUp,
  FileText,
  Heart,
  Bell,
  CreditCard,
} from "lucide-react";
import styles from "./Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/shared/Context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = hasRole("admin");
  const isLoggedInUser = isAuthenticated() && hasRole("user");

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

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(`.${styles.userMenu}`)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Admin Navigation Links
  const adminNavLinks = (
    <>
      <li className={styles.navItem}>
        <Link
          href="/admin/dashboard"
          className={`${styles.navLink} ${
            isActive("/admin/dashboard") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <LayoutDashboard className={styles.navLinkIcon} />
          Dashboard
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/admin/bookings"
          className={`${styles.navLink} ${
            isActive("/admin/bookings") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <CalendarCheck className={styles.navLinkIcon} />
          Bookings
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/admin/guests"
          className={`${styles.navLink} ${
            isActive("/admin/guests") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <Users className={styles.navLinkIcon} />
          Guests
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/admin/rooms"
          className={`${styles.navLink} ${
            isActive("/admin/rooms") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <Hotel className={styles.navLinkIcon} />
          Rooms
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/admin/arrivals"
          className={`${styles.navLink} ${
            isActive("/admin/arrivals") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <TrendingUp className={styles.navLinkIcon} />
          Arrivals
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/admin/reports"
          className={`${styles.navLink} ${
            isActive("/admin/reports") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <FileText className={styles.navLinkIcon} />
          Reports
        </Link>
      </li>
    </>
  );

  // Logged-in User Navigation Links
  const loggedInUserNavLinks = (
    <>
      <li className={styles.navItem}>
        <Link
          href="/user/dashboard"
          className={`${styles.navLink} ${
            isActive("/") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <Hotel className={styles.navLinkIcon} />
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
          <Search className={styles.navLinkIcon} />
          Browse Hotels
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/user/bookings"
          className={`${styles.navLink} ${
            isActive("/bookings") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <CalendarCheck className={styles.navLinkIcon} />
          My Bookings
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href="/favorites"
          className={`${styles.navLink} ${
            isActive("/favorites") ? styles.activeLink : ""
          }`}
          onClick={closeMobileMenu}
        >
          <Heart className={styles.navLinkIcon} />
          Favorites
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
          <TrendingUp className={styles.navLinkIcon} />
          Deals
          <span className={styles.dealsBadge}>Hot</span>
        </Link>
      </li>
    </>
  );

  // Guest User Navigation Links (not logged in)
  const guestNavLinks = (
    <>
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
    </>
  );

  // Determine which navigation to show
  const getNavigationLinks = () => {
    if (isAdmin) return adminNavLinks;
    if (isLoggedInUser) return loggedInUserNavLinks;
    return guestNavLinks;
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Top Bar - Hide for Admin and Logged-in Users */}
      {!isAdmin && !isLoggedInUser && (
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
      )}

      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link
              href={isAdmin ? "/admin/dashboard" : "/"}
              className={styles.logo}
              onClick={closeMobileMenu}
            >
              <div className={styles.logoIcon}>🏨</div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>
                  {isAdmin ? "Admin Panel" : "LinuBayo Elite Resort"}
                </span>
                <span className={styles.logoTagline}>
                  {isAdmin
                    ? "Management System"
                    : isLoggedInUser
                    ? `Welcome, ${user?.name}`
                    : "Your Perfect Stay"}
                </span>
              </div>
            </Link>
          </div>

          {isMobileMenuOpen && (
            <div
              className={`${styles.overlay} ${styles.active}`}
              onClick={toggleMobileMenu}
            ></div>
          )}

          <div
            className={`${styles.navCenter} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
          >
            <ul className={styles.navLinks}>
              {/* Conditional Navigation based on role/auth status */}
              {getNavigationLinks()}

              {/* Mobile User Menu */}
              {isAuthenticated() && (
                <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                  <div className={styles.mobileUserInfo}>
                    <User className={styles.userIcon} />
                    <span>{user?.name}</span>
                    <span className={styles.userRole}>({user?.role})</span>
                  </div>
                </li>
              )}

              {isAuthenticated() && (
                <>
                  <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                    <Link
                      href="/profile"
                      className={styles.mobileMenuLink}
                      onClick={closeMobileMenu}
                    >
                      <User className={styles.menuLinkIcon} />
                      Profile
                    </Link>
                  </li>

                  {hasRole("user") && (
                    <>
                      <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                        <Link
                          href="/bookings"
                          className={styles.mobileMenuLink}
                          onClick={closeMobileMenu}
                        >
                          <CalendarCheck className={styles.menuLinkIcon} />
                          My Bookings
                        </Link>
                      </li>
                      <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                        <Link
                          href="/favorites"
                          className={styles.mobileMenuLink}
                          onClick={closeMobileMenu}
                        >
                          <Heart className={styles.menuLinkIcon} />
                          Favorites
                        </Link>
                      </li>
                      <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                        <Link
                          href="/payments"
                          className={styles.mobileMenuLink}
                          onClick={closeMobileMenu}
                        >
                          <CreditCard className={styles.menuLinkIcon} />
                          Payments
                        </Link>
                      </li>
                    </>
                  )}

                  {hasRole("admin") && (
                    <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                      <Link
                        href="/admin/settings"
                        className={styles.mobileMenuLink}
                        onClick={closeMobileMenu}
                      >
                        <Settings className={styles.menuLinkIcon} />
                        Settings
                      </Link>
                    </li>
                  )}

                  <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                    <button
                      className={styles.mobileLogoutBtn}
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                    >
                      <LogOut className={styles.menuLinkIcon} />
                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* Mobile Login Button */}
              {!isAuthenticated() && (
                <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                  <Link
                    href="/login"
                    className={styles.mobileLoginBtn}
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.navRight}>
            {/* Notifications for logged-in users */}
            {isLoggedInUser && (
              <button className={styles.notificationBtn}>
                <Bell className={styles.notificationIcon} />
                <span className={styles.notificationBadge}>3</span>
              </button>
            )}

            {/* Search button */}
            <button className={styles.searchBtn}>
              <Search className={styles.searchIcon} />
            </button>

            {/* Desktop Auth Section */}
            {isAuthenticated() ? (
              <div className={styles.userMenu}>
                <button className={styles.userBtn} onClick={toggleDropdown}>
                  <User className={styles.userIcon} />
                  <span>{user?.name}</span>
                  <ChevronDown
                    className={`${styles.dropdownIcon} ${
                      isDropdownOpen ? styles.rotated : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <p className={styles.userName}>{user?.name}</p>
                      <p className={styles.userEmail}>{user?.email}</p>
                      <span className={styles.roleBadge}>{user?.role}</span>
                    </div>

                    <div className={styles.dropdownDivider}></div>

                    <Link
                      href="/profile"
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className={styles.dropdownIcon} />
                      Profile
                    </Link>

                    {hasRole("user") && (
                      <>
                        <Link
                          href="/bookings"
                          className={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <CalendarCheck className={styles.dropdownIcon} />
                          My Bookings
                        </Link>
                        <Link
                          href="/favorites"
                          className={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Heart className={styles.dropdownIcon} />
                          Favorites
                        </Link>
                        <Link
                          href="/payments"
                          className={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <CreditCard className={styles.dropdownIcon} />
                          Payment Methods
                        </Link>
                      </>
                    )}

                    {hasRole("admin") && (
                      <>
                        <Link
                          href="/admin/dashboard"
                          className={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className={styles.dropdownIcon} />
                          Dashboard
                        </Link>
                        <Link
                          href="/admin/settings"
                          className={styles.dropdownItem}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className={styles.dropdownIcon} />
                          Settings
                        </Link>
                      </>
                    )}

                    <div className={styles.dropdownDivider}></div>

                    <button
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      <LogOut className={styles.dropdownIcon} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.signInBtn}>
                Log In
              </Link>
            )}

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
