"use client";

import React, { useState } from "react";
import styles from "./adminarrivals.module.css";

const AdminArrivals = () => {
  const [selectedDate, setSelectedDate] = useState("2024-12-05");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample arrivals data
  const [arrivals, setArrivals] = useState([
    {
      id: 1,
      guestName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234 567 8900",
      roomNumber: "305",
      roomType: "Double",
      checkIn: "2024-12-05",
      checkInTime: "14:00",
      checkOut: "2024-12-08",
      guests: 2,
      status: "pending",
      bookingId: "BK1001",
      specialRequests: "Late check-in requested",
      paymentStatus: "paid",
      avatar: "SJ",
      nationality: "USA",
    },
    {
      id: 2,
      guestName: "Michael Chen",
      email: "mchen@email.com",
      phone: "+1 234 567 8901",
      roomNumber: "412",
      roomType: "Suite",
      checkIn: "2024-12-05",
      checkInTime: "15:30",
      checkOut: "2024-12-10",
      guests: 1,
      status: "checked-in",
      bookingId: "BK1002",
      specialRequests: "None",
      paymentStatus: "paid",
      avatar: "MC",
      nationality: "Canada",
    },
    {
      id: 3,
      guestName: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 234 567 8902",
      roomNumber: "201",
      roomType: "Double",
      checkIn: "2024-12-05",
      checkInTime: "16:00",
      checkOut: "2024-12-15",
      guests: 3,
      status: "pending",
      bookingId: "BK1003",
      specialRequests: "Extra bed needed",
      paymentStatus: "pending",
      avatar: "ER",
      nationality: "Mexico",
    },
    {
      id: 4,
      guestName: "David Thompson",
      email: "dthompson@email.com",
      phone: "+1 234 567 8903",
      roomNumber: "508",
      roomType: "Single",
      checkIn: "2024-12-05",
      checkInTime: "13:00",
      checkOut: "2024-12-07",
      guests: 1,
      status: "checked-in",
      bookingId: "BK1004",
      specialRequests: "Early check-in",
      paymentStatus: "paid",
      avatar: "DT",
      nationality: "UK",
    },
    {
      id: 5,
      guestName: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 234 567 8904",
      roomNumber: "607",
      roomType: "Double",
      checkIn: "2024-12-05",
      checkInTime: "17:00",
      checkOut: "2024-12-09",
      guests: 2,
      status: "pending",
      bookingId: "BK1005",
      specialRequests: "High floor preferred",
      paymentStatus: "paid",
      avatar: "LA",
      nationality: "Australia",
    },
    {
      id: 6,
      guestName: "James Wilson",
      email: "jwilson@email.com",
      phone: "+1 234 567 8905",
      roomNumber: "310",
      roomType: "Suite",
      checkIn: "2024-12-05",
      checkInTime: "14:30",
      checkOut: "2024-12-12",
      guests: 2,
      status: "cancelled",
      bookingId: "BK1006",
      specialRequests: "None",
      paymentStatus: "refunded",
      avatar: "JW",
      nationality: "USA",
    },
  ]);

  const filteredArrivals = arrivals.filter((arrival) => {
    const matchesSearch =
      arrival.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.roomNumber.includes(searchTerm) ||
      arrival.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || arrival.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: arrivals.filter((a) => a.status !== "cancelled").length,
    checkedIn: arrivals.filter((a) => a.status === "checked-in").length,
    pending: arrivals.filter((a) => a.status === "pending").length,
    cancelled: arrivals.filter((a) => a.status === "cancelled").length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return styles.statusCheckedIn;
      case "pending":
        return styles.statusPending;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "checked-in":
        return "Checked In";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return styles.paymentPaid;
      case "pending":
        return styles.paymentPending;
      case "refunded":
        return styles.paymentRefunded;
      default:
        return "";
    }
  };

  const handleCheckIn = (id) => {
    setArrivals(
      arrivals.map((arrival) =>
        arrival.id === id ? { ...arrival, status: "checked-in" } : arrival
      )
    );
  };

  return (
    <div className={styles.adminPage}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>🎯 Today's Arrivals</h1>
              <p className={styles.pageSubtitle}>
                Manage guest check-ins and arrivals
              </p>
            </div>
            <div className={styles.dateSelector}>
              <span className={styles.dateIcon}>📅</span>
              <input
                type="date"
                className={styles.dateInput}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📋</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.total}</div>
                <div className={styles.statLabel}>Total Arrivals</div>
              </div>
              <div className={styles.statTrend}>+3 from yesterday</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.checkedIn}</div>
                <div className={styles.statLabel}>Checked In</div>
              </div>
              <div className={styles.statProgress}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⏳</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.pending}</div>
                <div className={styles.statLabel}>Pending</div>
              </div>
              <div className={styles.statProgress}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚠️</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.cancelled}</div>
                <div className={styles.statLabel}>Cancelled</div>
              </div>
              <div className={styles.statNote}>Requires attention</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.controlBar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by guest name, room, or booking ID..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "all" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All ({arrivals.length})
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "pending" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending ({stats.pending})
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "checked-in" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("checked-in")}
            >
              Checked In ({stats.checkedIn})
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "cancelled" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("cancelled")}
            >
              Cancelled ({stats.cancelled})
            </button>
          </div>
        </div>

        {/* Arrivals Timeline */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            <h2 className={styles.timelineTitle}>Arrival Schedule</h2>
            <div className={styles.timelineLegend}>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendDot} ${styles.dotPending}`}
                ></span>
                Pending
              </span>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendDot} ${styles.dotCheckedIn}`}
                ></span>
                Checked In
              </span>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendDot} ${styles.dotCancelled}`}
                ></span>
                Cancelled
              </span>
            </div>
          </div>

          <div className={styles.arrivalsGrid}>
            {filteredArrivals.map((arrival, index) => (
              <div key={arrival.id} className={styles.arrivalCard}>
                <div className={styles.cardLeftBorder}></div>

                <div className={styles.cardHeader}>
                  <div className={styles.guestSection}>
                    <div className={styles.avatar}>{arrival.avatar}</div>
                    <div className={styles.guestDetails}>
                      <h3 className={styles.guestName}>{arrival.guestName}</h3>
                      <div className={styles.guestMeta}>
                        <span className={styles.bookingId}>
                          #{arrival.bookingId}
                        </span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.nationality}>
                          🌍 {arrival.nationality}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${getStatusColor(
                      arrival.status
                    )}`}
                  >
                    {getStatusText(arrival.status)}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>🏨</span>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Room</div>
                        <div className={styles.infoValue}>
                          {arrival.roomNumber} - {arrival.roomType}
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>⏰</span>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Check-in Time</div>
                        <div className={styles.infoValue}>
                          {arrival.checkInTime}
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>📅</span>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Stay Duration</div>
                        <div className={styles.infoValue}>
                          {arrival.checkIn} - {arrival.checkOut}
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>👥</span>
                      <div className={styles.infoContent}>
                        <div className={styles.infoLabel}>Guests</div>
                        <div className={styles.infoValue}>
                          {arrival.guests}{" "}
                          {arrival.guests > 1 ? "Guests" : "Guest"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <span className={styles.contactIcon}>📧</span>
                      <span className={styles.contactText}>
                        {arrival.email}
                      </span>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactIcon}>📱</span>
                      <span className={styles.contactText}>
                        {arrival.phone}
                      </span>
                    </div>
                  </div>

                  {arrival.specialRequests !== "None" && (
                    <div className={styles.specialRequests}>
                      <span className={styles.requestIcon}>💬</span>
                      <span className={styles.requestText}>
                        {arrival.specialRequests}
                      </span>
                    </div>
                  )}

                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentLabel}>Payment:</span>
                    <span
                      className={`${
                        styles.paymentBadge
                      } ${getPaymentStatusColor(arrival.paymentStatus)}`}
                    >
                      {arrival.paymentStatus.charAt(0).toUpperCase() +
                        arrival.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {arrival.status === "pending" && (
                    <>
                      <button
                        className={styles.primaryButton}
                        onClick={() => handleCheckIn(arrival.id)}
                      >
                        ✓ Check In
                      </button>
                      <button className={styles.secondaryButton}>
                        📋 Details
                      </button>
                      <button className={styles.secondaryButton}>
                        📞 Contact
                      </button>
                    </>
                  )}
                  {arrival.status === "checked-in" && (
                    <>
                      <button className={styles.secondaryButton}>
                        🔑 Room Keys
                      </button>
                      <button className={styles.secondaryButton}>
                        📋 Details
                      </button>
                      <button className={styles.secondaryButton}>
                        🎯 Services
                      </button>
                    </>
                  )}
                  {arrival.status === "cancelled" && (
                    <>
                      <button className={styles.secondaryButton}>
                        📋 Details
                      </button>
                      <button className={styles.secondaryButton}>
                        💰 Refund
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredArrivals.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No arrivals found</h3>
              <p className={styles.emptyText}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminArrivals;
