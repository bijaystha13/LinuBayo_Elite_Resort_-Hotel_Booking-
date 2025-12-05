"use client";

import React, { useState } from "react";
import styles from "./adminguests.module.css";

const AdminGuests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Sample guest data
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234 567 8900",
      roomNumber: "305",
      checkIn: "2024-12-05",
      checkOut: "2024-12-08",
      status: "checked-in",
      guests: 2,
      totalSpent: "$450",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "mchen@email.com",
      phone: "+1 234 567 8901",
      roomNumber: "412",
      checkIn: "2024-12-04",
      checkOut: "2024-12-10",
      status: "checked-in",
      guests: 1,
      totalSpent: "$780",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 234 567 8902",
      roomNumber: "201",
      checkIn: "2024-12-10",
      checkOut: "2024-12-15",
      status: "reserved",
      guests: 3,
      totalSpent: "$920",
      avatar: "ER",
    },
    {
      id: 4,
      name: "David Thompson",
      email: "dthompson@email.com",
      phone: "+1 234 567 8903",
      roomNumber: "508",
      checkIn: "2024-12-01",
      checkOut: "2024-12-04",
      status: "checked-out",
      guests: 2,
      totalSpent: "$560",
      avatar: "DT",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 234 567 8904",
      roomNumber: "607",
      checkIn: "2024-12-06",
      checkOut: "2024-12-09",
      status: "checked-in",
      guests: 1,
      totalSpent: "$340",
      avatar: "LA",
    },
  ]);

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.roomNumber.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || guest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return styles.statusCheckedIn;
      case "checked-out":
        return styles.statusCheckedOut;
      case "reserved":
        return styles.statusReserved;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "checked-in":
        return "Checked In";
      case "checked-out":
        return "Checked Out";
      case "reserved":
        return "Reserved";
      default:
        return status;
    }
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
              <h1 className={styles.pageTitle}>👥 Guest Management</h1>
              <p className={styles.pageSubtitle}>
                Manage and monitor all hotel guests
              </p>
            </div>
            <button
              className={styles.addButton}
              onClick={() => setShowAddModal(true)}
            >
              <span className={styles.addIcon}>+</span>
              Add Guest
            </button>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏨</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>12</div>
                <div className={styles.statLabel}>Checked In</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📅</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>8</div>
                <div className={styles.statLabel}>Reservations</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>24</div>
                <div className={styles.statLabel}>Total Guests</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>$3,050</div>
                <div className={styles.statLabel}>Today's Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={styles.controlBar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, or room..."
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
              All
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "checked-in" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("checked-in")}
            >
              Checked In
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "reserved" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("reserved")}
            >
              Reserved
            </button>
            <button
              className={`${styles.filterButton} ${
                filterStatus === "checked-out" ? styles.active : ""
              }`}
              onClick={() => setFilterStatus("checked-out")}
            >
              Checked Out
            </button>
          </div>
        </div>

        {/* Guests Table */}
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.th}>Guest</div>
              <div className={styles.th}>Contact</div>
              <div className={styles.th}>Room</div>
              <div className={styles.th}>Check In</div>
              <div className={styles.th}>Check Out</div>
              <div className={styles.th}>Status</div>
              <div className={styles.th}>Total Spent</div>
              <div className={styles.th}>Actions</div>
            </div>
            <div className={styles.tableBody}>
              {filteredGuests.map((guest) => (
                <div key={guest.id} className={styles.tableRow}>
                  <div className={styles.td}>
                    <div className={styles.guestInfo}>
                      <div className={styles.avatar}>{guest.avatar}</div>
                      <div>
                        <div className={styles.guestName}>{guest.name}</div>
                        <div className={styles.guestDetail}>
                          {guest.guests} {guest.guests > 1 ? "Guests" : "Guest"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.contactInfo}>
                      <div className={styles.email}>{guest.email}</div>
                      <div className={styles.phone}>{guest.phone}</div>
                    </div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.roomBadge}>
                      Room {guest.roomNumber}
                    </div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.dateText}>{guest.checkIn}</div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.dateText}>{guest.checkOut}</div>
                  </div>
                  <div className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        guest.status
                      )}`}
                    >
                      {getStatusText(guest.status)}
                    </span>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.spentAmount}>{guest.totalSpent}</div>
                  </div>
                  <div className={styles.td}>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionButton}
                        onClick={() => setSelectedGuest(guest)}
                      >
                        👁️
                      </button>
                      <button className={styles.actionButton}>✏️</button>
                      <button className={styles.actionButton}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGuests;
