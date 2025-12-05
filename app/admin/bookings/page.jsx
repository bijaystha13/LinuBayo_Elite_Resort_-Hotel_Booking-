"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./adminbookings.module.css";

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const itemsPerPage = 10;

  // Mock bookings data - replace with API call
  const allBookings = [
    {
      id: "BK001",
      guestName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      roomType: "Deluxe Suite",
      roomNumber: "301",
      checkIn: "2024-12-15",
      checkOut: "2024-12-18",
      nights: 3,
      guests: 2,
      amount: 450,
      status: "confirmed",
      paymentStatus: "paid",
      bookingDate: "2024-12-01",
      specialRequests: "Late check-in requested",
    },
    {
      id: "BK002",
      guestName: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678",
      roomType: "Ocean View Room",
      roomNumber: "205",
      checkIn: "2024-12-16",
      checkOut: "2024-12-20",
      nights: 4,
      guests: 3,
      amount: 760,
      status: "pending",
      paymentStatus: "pending",
      bookingDate: "2024-12-02",
      specialRequests: "Need baby cot",
    },
    {
      id: "BK003",
      guestName: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 345-6789",
      roomType: "Premium Room",
      roomNumber: "412",
      checkIn: "2024-12-14",
      checkOut: "2024-12-17",
      nights: 3,
      guests: 2,
      amount: 390,
      status: "checked-in",
      paymentStatus: "paid",
      bookingDate: "2024-11-28",
      specialRequests: "Ground floor preferred",
    },
    {
      id: "BK004",
      guestName: "David Kim",
      email: "david.k@email.com",
      phone: "+1 (555) 456-7890",
      roomType: "Executive Suite",
      roomNumber: "501",
      checkIn: "2024-12-20",
      checkOut: "2024-12-25",
      nights: 5,
      guests: 4,
      amount: 1250,
      status: "confirmed",
      paymentStatus: "paid",
      bookingDate: "2024-12-03",
      specialRequests: "Airport pickup required",
    },
    {
      id: "BK005",
      guestName: "Jessica Martinez",
      email: "jess.m@email.com",
      phone: "+1 (555) 567-8901",
      roomType: "Standard Room",
      roomNumber: "102",
      checkIn: "2024-12-10",
      checkOut: "2024-12-13",
      nights: 3,
      guests: 1,
      amount: 270,
      status: "checked-out",
      paymentStatus: "paid",
      bookingDate: "2024-11-25",
      specialRequests: "None",
    },
    {
      id: "BK006",
      guestName: "Robert Taylor",
      email: "r.taylor@email.com",
      phone: "+1 (555) 678-9012",
      roomType: "Deluxe Room",
      roomNumber: "208",
      checkIn: "2024-12-18",
      checkOut: "2024-12-22",
      nights: 4,
      guests: 2,
      amount: 520,
      status: "cancelled",
      paymentStatus: "refunded",
      bookingDate: "2024-11-30",
      specialRequests: "Cancelled by guest",
    },
  ];

  // Filter bookings
  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className={styles.statusIcon} />;
      case "pending":
        return <Clock className={styles.statusIcon} />;
      case "checked-in":
        return <CheckCircle className={styles.statusIcon} />;
      case "checked-out":
        return <CheckCircle className={styles.statusIcon} />;
      case "cancelled":
        return <XCircle className={styles.statusIcon} />;
      default:
        return <Clock className={styles.statusIcon} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.bookingsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.pageTitle}>Bookings Management</h1>
            <p className={styles.pageSubtitle}>
              Manage and track all hotel reservations
            </p>
          </div>
          <button className={styles.exportBtn}>
            <Download className={styles.btnIcon} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Bookings</span>
          <span className={styles.statValue}>{allBookings.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Confirmed</span>
          <span className={`${styles.statValue} ${styles.confirmed}`}>
            {allBookings.filter((b) => b.status === "confirmed").length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Pending</span>
          <span className={`${styles.statValue} ${styles.pending}`}>
            {allBookings.filter((b) => b.status === "pending").length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Active</span>
          <span className={`${styles.statValue} ${styles.active}`}>
            {allBookings.filter((b) => b.status === "checked-in").length}
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by guest name, booking ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <button className={styles.filterBtn}>
            <Filter className={styles.btnIcon} />
            More Filters
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Details</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <span className={styles.bookingId}>{booking.id}</span>
                  </td>
                  <td>
                    <div className={styles.guestCell}>
                      <div className={styles.guestAvatar}>
                        {booking.guestName.charAt(0)}
                      </div>
                      <div className={styles.guestInfo}>
                        <span className={styles.guestName}>
                          {booking.guestName}
                        </span>
                        <span className={styles.guestEmail}>
                          {booking.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.roomCell}>
                      <span className={styles.roomType}>
                        {booking.roomType}
                      </span>
                      <span className={styles.roomNumber}>
                        Room {booking.roomNumber}
                      </span>
                    </div>
                  </td>
                  <td>{formatDate(booking.checkIn)}</td>
                  <td>{formatDate(booking.checkOut)}</td>
                  <td>
                    <span className={styles.nights}>{booking.nights}</span>
                  </td>
                  <td>
                    <span className={styles.amount}>
                      {formatCurrency(booking.amount)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[booking.status]
                      }`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleViewDetails(booking)}
                        title="View Details"
                      >
                        <Eye className={styles.actionIcon} />
                      </button>
                      <button className={styles.actionBtn} title="Edit Booking">
                        <Edit className={styles.actionIcon} />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        title="Delete Booking"
                      >
                        <Trash2 className={styles.actionIcon} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredBookings.length)} of{" "}
            {filteredBookings.length} bookings
          </div>
          <div className={styles.paginationControls}>
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className={styles.paginationIcon} />
              Previous
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`${styles.pageNumber} ${
                      currentPage === page ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              className={styles.paginationBtn}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className={styles.paginationIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Booking Details</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <XCircle className={styles.closeIcon} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Booking Status */}
              <div className={styles.detailSection}>
                <div className={styles.bookingStatusHeader}>
                  <span className={styles.bookingIdLarge}>
                    {selectedBooking.id}
                  </span>
                  <span
                    className={`${styles.statusBadgeLarge} ${
                      styles[selectedBooking.status]
                    }`}
                  >
                    {getStatusIcon(selectedBooking.status)}
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              {/* Guest Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <User className={styles.sectionIcon} />
                  Guest Information
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Full Name</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.guestName}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.email}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Phone</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.phone}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Number of Guests</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.guests}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <MapPin className={styles.sectionIcon} />
                  Room Information
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Room Type</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.roomType}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Room Number</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.roomNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stay Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <Calendar className={styles.sectionIcon} />
                  Stay Information
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Check-in</span>
                    <span className={styles.detailValue}>
                      {formatDate(selectedBooking.checkIn)}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Check-out</span>
                    <span className={styles.detailValue}>
                      {formatDate(selectedBooking.checkOut)}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Total Nights</span>
                    <span className={styles.detailValue}>
                      {selectedBooking.nights}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Booking Date</span>
                    <span className={styles.detailValue}>
                      {formatDate(selectedBooking.bookingDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <CreditCard className={styles.sectionIcon} />
                  Payment Information
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Total Amount</span>
                    <span className={styles.detailValueLarge}>
                      {formatCurrency(selectedBooking.amount)}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Payment Status</span>
                    <span
                      className={`${styles.paymentBadge} ${
                        styles[selectedBooking.paymentStatus]
                      }`}
                    >
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Special Requests</h3>
                  <p className={styles.specialRequests}>
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalActionBtn}
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button className={`${styles.modalActionBtn} ${styles.primary}`}>
                Edit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
