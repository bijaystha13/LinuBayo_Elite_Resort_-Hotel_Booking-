"use client";

import React, { useState } from "react";
import styles from "./adminrooms.module.css";

const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample rooms data
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: "101",
      type: "Single",
      floor: 1,
      price: 120,
      status: "available",
      capacity: 1,
      amenities: ["WiFi", "TV", "AC"],
      image: "🛏️",
      size: "250 sq ft",
      bedType: "Single Bed",
    },
    {
      id: 2,
      number: "205",
      type: "Double",
      floor: 2,
      price: 180,
      status: "occupied",
      capacity: 2,
      amenities: ["WiFi", "TV", "AC", "Mini Bar"],
      image: "🛏️",
      size: "350 sq ft",
      bedType: "Queen Bed",
      guest: "Sarah Johnson",
      checkOut: "2024-12-08",
    },
    {
      id: 3,
      number: "308",
      type: "Suite",
      floor: 3,
      price: 350,
      status: "available",
      capacity: 4,
      amenities: ["WiFi", "TV", "AC", "Mini Bar", "Jacuzzi", "Balcony"],
      image: "🏨",
      size: "600 sq ft",
      bedType: "King Bed",
    },
    {
      id: 4,
      number: "412",
      type: "Double",
      floor: 4,
      price: 190,
      status: "occupied",
      capacity: 2,
      amenities: ["WiFi", "TV", "AC", "Mini Bar"],
      image: "🛏️",
      size: "380 sq ft",
      bedType: "Queen Bed",
      guest: "Michael Chen",
      checkOut: "2024-12-10",
    },
    {
      id: 5,
      number: "501",
      type: "Suite",
      floor: 5,
      price: 450,
      status: "maintenance",
      capacity: 4,
      amenities: [
        "WiFi",
        "TV",
        "AC",
        "Mini Bar",
        "Jacuzzi",
        "Balcony",
        "Kitchen",
      ],
      image: "🏨",
      size: "800 sq ft",
      bedType: "King Bed",
    },
    {
      id: 6,
      number: "203",
      type: "Single",
      floor: 2,
      price: 130,
      status: "available",
      capacity: 1,
      amenities: ["WiFi", "TV", "AC"],
      image: "🛏️",
      size: "280 sq ft",
      bedType: "Single Bed",
    },
    {
      id: 7,
      number: "407",
      type: "Double",
      floor: 4,
      price: 200,
      status: "reserved",
      capacity: 2,
      amenities: ["WiFi", "TV", "AC", "Mini Bar", "Balcony"],
      image: "🛏️",
      size: "400 sq ft",
      bedType: "King Bed",
      guest: "Emily Rodriguez",
      checkIn: "2024-12-10",
    },
    {
      id: 8,
      number: "310",
      type: "Suite",
      floor: 3,
      price: 380,
      status: "available",
      capacity: 3,
      amenities: ["WiFi", "TV", "AC", "Mini Bar", "Jacuzzi"],
      image: "🏨",
      size: "650 sq ft",
      bedType: "King Bed",
    },
  ]);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.includes(searchTerm) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      room.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "all" || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return styles.statusAvailable;
      case "occupied":
        return styles.statusOccupied;
      case "reserved":
        return styles.statusReserved;
      case "maintenance":
        return styles.statusMaintenance;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "available").length,
    occupied: rooms.filter((r) => r.status === "occupied").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
    revenue: rooms
      .filter((r) => r.status === "occupied")
      .reduce((sum, r) => sum + r.price, 0),
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
              <h1 className={styles.pageTitle}>🏨 Room Management</h1>
              <p className={styles.pageSubtitle}>
                Manage hotel rooms and availability
              </p>
            </div>
            <button
              className={styles.addButton}
              onClick={() => setShowAddModal(true)}
            >
              <span className={styles.addIcon}>+</span>
              Add Room
            </button>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏨</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.total}</div>
                <div className={styles.statLabel}>Total Rooms</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.available}</div>
                <div className={styles.statLabel}>Available</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🔑</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.occupied}</div>
                <div className={styles.statLabel}>Occupied</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>${stats.revenue}</div>
                <div className={styles.statLabel}>Today's Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controlBar}>
          <div className={styles.leftControls}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by room number or type..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>

              <select
                className={styles.filterSelect}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${
                viewMode === "grid" ? styles.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              ▦
            </button>
            <button
              className={`${styles.viewButton} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Rooms Grid/List */}
        {viewMode === "grid" ? (
          <div className={styles.roomsGrid}>
            {filteredRooms.map((room) => (
              <div key={room.id} className={styles.roomCard}>
                <div className={styles.roomHeader}>
                  <div className={styles.roomIcon}>{room.image}</div>
                  <span
                    className={`${styles.statusBadge} ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {getStatusText(room.status)}
                  </span>
                </div>

                <div className={styles.roomBody}>
                  <div className={styles.roomTitle}>
                    <h3 className={styles.roomNumber}>Room {room.number}</h3>
                    <div className={styles.roomType}>{room.type}</div>
                  </div>

                  <div className={styles.roomDetails}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Floor:</span>
                      <span className={styles.detailValue}>{room.floor}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Capacity:</span>
                      <span className={styles.detailValue}>
                        {room.capacity} guests
                      </span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Size:</span>
                      <span className={styles.detailValue}>{room.size}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Bed:</span>
                      <span className={styles.detailValue}>{room.bedType}</span>
                    </div>
                  </div>

                  {(room.status === "occupied" || room.status === "reserved") &&
                    room.guest && (
                      <div className={styles.guestInfo}>
                        <div className={styles.guestLabel}>
                          {room.status === "occupied"
                            ? "👤 Current Guest:"
                            : "📅 Reserved by:"}
                        </div>
                        <div className={styles.guestName}>{room.guest}</div>
                        {room.checkOut && (
                          <div className={styles.checkoutDate}>
                            Until: {room.checkOut}
                          </div>
                        )}
                        {room.checkIn && (
                          <div className={styles.checkoutDate}>
                            From: {room.checkIn}
                          </div>
                        )}
                      </div>
                    )}

                  <div className={styles.amenitiesList}>
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className={styles.amenityTag}>
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className={styles.amenityTag}>
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.roomFooter}>
                  <div className={styles.priceTag}>
                    <span className={styles.priceAmount}>${room.price}</span>
                    <span className={styles.priceLabel}>/night</span>
                  </div>
                  <div className={styles.roomActions}>
                    <button className={styles.actionBtn}>✏️</button>
                    <button className={styles.actionBtn}>👁️</button>
                    <button className={styles.actionBtn}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.roomsList}>
            {filteredRooms.map((room) => (
              <div key={room.id} className={styles.listItem}>
                <div className={styles.listIcon}>{room.image}</div>
                <div className={styles.listContent}>
                  <div className={styles.listMain}>
                    <div className={styles.listLeft}>
                      <h3 className={styles.listRoomNumber}>
                        Room {room.number}
                      </h3>
                      <div className={styles.listMeta}>
                        <span className={styles.listType}>{room.type}</span>
                        <span className={styles.listSeparator}>•</span>
                        <span>Floor {room.floor}</span>
                        <span className={styles.listSeparator}>•</span>
                        <span>{room.capacity} guests</span>
                      </div>
                    </div>
                    <div className={styles.listRight}>
                      <span
                        className={`${styles.statusBadge} ${getStatusColor(
                          room.status
                        )}`}
                      >
                        {getStatusText(room.status)}
                      </span>
                      <div className={styles.listPrice}>
                        <span className={styles.listPriceAmount}>
                          ${room.price}
                        </span>
                        <span className={styles.listPriceLabel}>/night</span>
                      </div>
                    </div>
                  </div>
                  {(room.status === "occupied" || room.status === "reserved") &&
                    room.guest && (
                      <div className={styles.listGuest}>
                        {room.status === "occupied" ? "👤" : "📅"} {room.guest}
                        {room.checkOut && ` - Until: ${room.checkOut}`}
                        {room.checkIn && ` - From: ${room.checkIn}`}
                      </div>
                    )}
                </div>
                <div className={styles.listActions}>
                  <button className={styles.actionBtn}>✏️</button>
                  <button className={styles.actionBtn}>👁️</button>
                  <button className={styles.actionBtn}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRooms;
