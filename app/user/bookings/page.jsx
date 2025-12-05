// "use client";

// import React, { useState } from "react";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   Check,
//   X,
//   AlertCircle,
//   Download,
//   Mail,
//   Phone,
//   CreditCard,
//   Hotel,
//   Star,
//   ChevronRight,
//   Filter,
//   Search,
// } from "lucide-react";

// import ReceiptModal from "@/app/components/Receipt/ReceiptModal";
// import styles from "./userbooking.module.css";

// const Bookings = () => {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Sample booking data
//   const bookings = [
//     {
//       id: "BK001",
//       hotelName: "Grand Plaza Hotel",
//       location: "New York, USA",
//       emoji: "🏨",
//       checkIn: "2024-12-15",
//       checkOut: "2024-12-18",
//       guests: 2,
//       rooms: 1,
//       roomType: "Deluxe Suite",
//       totalPrice: 450,
//       status: "confirmed",
//       bookingDate: "2024-12-01",
//       rating: 4.8,
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "BK002",
//       hotelName: "Ocean View Resort",
//       location: "Miami, USA",
//       emoji: "🏖️",
//       checkIn: "2024-12-20",
//       checkOut: "2024-12-25",
//       guests: 4,
//       rooms: 2,
//       roomType: "Ocean Front Room",
//       totalPrice: 890,
//       status: "confirmed",
//       bookingDate: "2024-11-28",
//       rating: 4.9,
//       paymentMethod: "PayPal",
//     },
//     {
//       id: "BK003",
//       hotelName: "Mountain Lodge",
//       location: "Aspen, USA",
//       emoji: "⛰️",
//       checkIn: "2024-11-10",
//       checkOut: "2024-11-15",
//       guests: 3,
//       rooms: 1,
//       roomType: "Premium Cabin",
//       totalPrice: 650,
//       status: "completed",
//       bookingDate: "2024-10-20",
//       rating: 4.7,
//       paymentMethod: "Credit Card",
//     },
//     {
//       id: "BK004",
//       hotelName: "City Center Inn",
//       location: "Los Angeles, USA",
//       emoji: "🏙️",
//       checkIn: "2024-11-05",
//       checkOut: "2024-11-06",
//       guests: 1,
//       rooms: 1,
//       roomType: "Standard Room",
//       totalPrice: 120,
//       status: "cancelled",
//       bookingDate: "2024-10-25",
//       rating: 4.5,
//       paymentMethod: "Credit Card",
//     },
//   ];

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "confirmed":
//         return <Check className={styles.statusIcon} />;
//       case "completed":
//         return <Check className={styles.statusIcon} />;
//       case "cancelled":
//         return <X className={styles.statusIcon} />;
//       case "pending":
//         return <AlertCircle className={styles.statusIcon} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "confirmed":
//         return styles.statusConfirmed;
//       case "completed":
//         return styles.statusCompleted;
//       case "cancelled":
//         return styles.statusCancelled;
//       case "pending":
//         return styles.statusPending;
//       default:
//         return "";
//     }
//   };

//   const filterBookings = (bookings) => {
//     let filtered = bookings;

//     // Filter by tab
//     const today = new Date();
//     if (activeTab === "upcoming") {
//       filtered = filtered.filter(
//         (b) => new Date(b.checkIn) >= today && b.status === "confirmed"
//       );
//     } else if (activeTab === "completed") {
//       filtered = filtered.filter((b) => b.status === "completed");
//     } else if (activeTab === "cancelled") {
//       filtered = filtered.filter((b) => b.status === "cancelled");
//     }

//     // Filter by search
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (b) =>
//           b.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           b.id.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   const filteredBookings = filterBookings(bookings);

//   const stats = {
//     total: bookings.length,
//     upcoming: bookings.filter(
//       (b) => new Date(b.checkIn) >= new Date() && b.status === "confirmed"
//     ).length,
//     completed: bookings.filter((b) => b.status === "completed").length,
//     cancelled: bookings.filter((b) => b.status === "cancelled").length,
//   };

//   return (
//     <>
//       {selectedBooking && (
//         <ReceiptModal
//           booking={selectedBooking}
//           onClose={() => setSelectedBooking(null)}
//         />
//       )}

//       <div className={styles.bookingsPage}>
//         {/* Hero Section */}
//         <div className={styles.heroSection}>
//           <div className={styles.heroBackground}>
//             <div className={styles.gradientOrb1}></div>
//             <div className={styles.gradientOrb2}></div>
//             <div className={styles.gradientOrb3}></div>
//           </div>

//           <div className={styles.heroContent}>
//             <div className={styles.heroText}>
//               <h1 className={styles.heroTitle}>My Bookings</h1>
//               <p className={styles.heroDescription}>
//                 Manage and track all your hotel reservations in one place
//               </p>
//             </div>

//             {/* Stats Cards */}
//             <div className={styles.statsGrid}>
//               <div className={styles.statCard}>
//                 <div className={styles.statIcon}>
//                   <Calendar />
//                 </div>
//                 <div className={styles.statInfo}>
//                   <div className={styles.statNumber}>{stats.total}</div>
//                   <div className={styles.statLabel}>Total Bookings</div>
//                 </div>
//               </div>

//               <div className={styles.statCard}>
//                 <div className={styles.statIcon}>
//                   <Clock />
//                 </div>
//                 <div className={styles.statInfo}>
//                   <div className={styles.statNumber}>{stats.upcoming}</div>
//                   <div className={styles.statLabel}>Upcoming</div>
//                 </div>
//               </div>

//               <div className={styles.statCard}>
//                 <div className={styles.statIcon}>
//                   <Check />
//                 </div>
//                 <div className={styles.statInfo}>
//                   <div className={styles.statNumber}>{stats.completed}</div>
//                   <div className={styles.statLabel}>Completed</div>
//                 </div>
//               </div>

//               <div className={styles.statCard}>
//                 <div className={styles.statIcon}>
//                   <X />
//                 </div>
//                 <div className={styles.statInfo}>
//                   <div className={styles.statNumber}>{stats.cancelled}</div>
//                   <div className={styles.statLabel}>Cancelled</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={styles.mainContent}>
//           <div className={styles.contentContainer}>
//             {/* Filters and Search */}
//             <div className={styles.filterSection}>
//               {/* Tabs */}
//               <div className={styles.tabs}>
//                 <button
//                   className={`${styles.tab} ${
//                     activeTab === "all" ? styles.activeTab : ""
//                   }`}
//                   onClick={() => setActiveTab("all")}
//                 >
//                   All Bookings
//                 </button>
//                 <button
//                   className={`${styles.tab} ${
//                     activeTab === "upcoming" ? styles.activeTab : ""
//                   }`}
//                   onClick={() => setActiveTab("upcoming")}
//                 >
//                   Upcoming
//                 </button>
//                 <button
//                   className={`${styles.tab} ${
//                     activeTab === "completed" ? styles.activeTab : ""
//                   }`}
//                   onClick={() => setActiveTab("completed")}
//                 >
//                   Completed
//                 </button>
//                 <button
//                   className={`${styles.tab} ${
//                     activeTab === "cancelled" ? styles.activeTab : ""
//                   }`}
//                   onClick={() => setActiveTab("cancelled")}
//                 >
//                   Cancelled
//                 </button>
//               </div>

//               {/* Search */}
//               <div className={styles.searchBox}>
//                 <Search className={styles.searchIcon} />
//                 <input
//                   type="text"
//                   placeholder="Search by hotel name, location, or booking ID..."
//                   className={styles.searchInput}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Bookings List */}
//             <div className={styles.bookingsList}>
//               {filteredBookings.length === 0 ? (
//                 <div className={styles.emptyState}>
//                   <div className={styles.emptyIcon}>📭</div>
//                   <h3 className={styles.emptyTitle}>No bookings found</h3>
//                   <p className={styles.emptyDescription}>
//                     {activeTab === "upcoming"
//                       ? "You don't have any upcoming bookings. Start exploring hotels!"
//                       : "No bookings match your search criteria."}
//                   </p>
//                   <button className={styles.primaryButton}>
//                     Browse Hotels
//                     <ChevronRight className={styles.buttonIcon} />
//                   </button>
//                 </div>
//               ) : (
//                 filteredBookings.map((booking) => (
//                   <div key={booking.id} className={styles.bookingCard}>
//                     {/* Card Header */}
//                     <div className={styles.cardHeader}>
//                       <div className={styles.bookingId}>
//                         Booking ID: <span>{booking.id}</span>
//                       </div>
//                       <div
//                         className={`${styles.statusBadge} ${getStatusClass(
//                           booking.status
//                         )}`}
//                       >
//                         {getStatusIcon(booking.status)}
//                         <span>{booking.status}</span>
//                       </div>
//                     </div>

//                     {/* Card Body */}
//                     <div className={styles.cardBody}>
//                       {/* Hotel Info */}
//                       <div className={styles.hotelInfo}>
//                         <div className={styles.hotelEmoji}>{booking.emoji}</div>
//                         <div className={styles.hotelDetails}>
//                           <h3 className={styles.hotelName}>
//                             {booking.hotelName}
//                           </h3>
//                           <div className={styles.hotelLocation}>
//                             <MapPin className={styles.locationIcon} />
//                             <span>{booking.location}</span>
//                           </div>
//                           <div className={styles.hotelRating}>
//                             <Star className={styles.starIcon} />
//                             <span>{booking.rating}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Booking Details */}
//                       <div className={styles.bookingDetails}>
//                         <div className={styles.detailRow}>
//                           <div className={styles.detailItem}>
//                             <Calendar className={styles.detailIcon} />
//                             <div className={styles.detailContent}>
//                               <div className={styles.detailLabel}>Check-in</div>
//                               <div className={styles.detailValue}>
//                                 {new Date(booking.checkIn).toLocaleDateString(
//                                   "en-US",
//                                   {
//                                     month: "short",
//                                     day: "numeric",
//                                     year: "numeric",
//                                   }
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           <div className={styles.detailItem}>
//                             <Calendar className={styles.detailIcon} />
//                             <div className={styles.detailContent}>
//                               <div className={styles.detailLabel}>
//                                 Check-out
//                               </div>
//                               <div className={styles.detailValue}>
//                                 {new Date(booking.checkOut).toLocaleDateString(
//                                   "en-US",
//                                   {
//                                     month: "short",
//                                     day: "numeric",
//                                     year: "numeric",
//                                   }
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           <div className={styles.detailItem}>
//                             <Users className={styles.detailIcon} />
//                             <div className={styles.detailContent}>
//                               <div className={styles.detailLabel}>Guests</div>
//                               <div className={styles.detailValue}>
//                                 {booking.guests} Guest
//                                 {booking.guests > 1 ? "s" : ""}
//                               </div>
//                             </div>
//                           </div>

//                           <div className={styles.detailItem}>
//                             <Hotel className={styles.detailIcon} />
//                             <div className={styles.detailContent}>
//                               <div className={styles.detailLabel}>
//                                 Room Type
//                               </div>
//                               <div className={styles.detailValue}>
//                                 {booking.roomType}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className={styles.paymentInfo}>
//                           <CreditCard className={styles.paymentIcon} />
//                           <span className={styles.paymentMethod}>
//                             {booking.paymentMethod}
//                           </span>
//                           <div className={styles.totalPrice}>
//                             <span className={styles.priceLabel}>Total:</span>
//                             <span className={styles.priceAmount}>
//                               ${booking.totalPrice}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Card Footer */}
//                     <div className={styles.cardFooter}>
//                       <div className={styles.bookingDate}>
//                         Booked on{" "}
//                         {new Date(booking.bookingDate).toLocaleDateString(
//                           "en-US",
//                           {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           }
//                         )}
//                       </div>

//                       <div className={styles.cardActions}>
//                         {booking.status === "confirmed" && (
//                           <>
//                             <button className={styles.secondaryButton}>
//                               <Mail className={styles.buttonIcon} />
//                               Email Confirmation
//                             </button>
//                             <button className={styles.secondaryButton}>
//                               <Download className={styles.buttonIcon} />
//                               Download
//                             </button>
//                             <button className={styles.cancelButton}>
//                               Cancel Booking
//                             </button>
//                           </>
//                         )}

//                         {booking.status === "completed" && (
//                           <>
//                             {/* <button className={styles.secondaryButton}>
//                             <Download className={styles.buttonIcon} />
//                             Download Receipt
//                           </button> */}
//                             <button
//                               className={styles.secondaryButton}
//                               onClick={() => setSelectedBooking(booking)}
//                             >
//                               <Download className={styles.buttonIcon} />
//                               Download Receipt
//                             </button>

//                             <button className={styles.primaryButton}>
//                               Write a Review
//                             </button>
//                             <button className={styles.primaryButton}>
//                               Book Again
//                             </button>
//                           </>
//                         )}

//                         {booking.status === "cancelled" && (
//                           <button className={styles.primaryButton}>
//                             Book Similar Hotel
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Bookings;
"use client";
"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Check,
  X,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useHttp } from "@/app/shared/hooks/useHttpHook";
import { useConfirmation } from "./hooks/useConfirmation";
import BookingCard from "./components/BookingCardComponent";
import BookingForm from "./components/BookingFormComponent";
import ReceiptModal from "@/app/components/Receipt/ReceiptModal";
import BookingsConfirmationModal from "./components/BookingsConfirmationModal";
import styles from "./userbooking.module.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { sendRequest, isLoading, error } = useHttp();
  const {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  } = useConfirmation();

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await sendRequest("/bookings", "GET");
      if (response.success) {
        setBookings(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = async (booking) => {
    showConfirmation({
      title: "Cancel Booking",
      message: `Are you sure you want to cancel booking ${booking.bookingId}? This action cannot be undone.`,
      confirmText: "Yes, Cancel Booking",
      cancelText: "Keep Booking",
      type: "danger",
      onConfirm: async () => {
        try {
          const response = await sendRequest(
            `/bookings/${booking.bookingId}`,
            "PATCH",
            { status: "cancelled" }
          );

          if (response.success) {
            setBookings((prev) =>
              prev.map((b) =>
                b.bookingId === booking.bookingId
                  ? { ...b, status: "cancelled" }
                  : b
              )
            );

            // Show success notification
            showConfirmation({
              title: "Booking Cancelled",
              message: `Booking ${booking.bookingId} has been successfully cancelled.`,
              confirmText: "OK",
              type: "success",
              onConfirm: () => {}, // Just close the modal
            });
          }
        } catch (err) {
          console.error("Failed to cancel booking:", err);

          // Show error notification
          showConfirmation({
            title: "Cancellation Failed",
            message:
              err.message || "Failed to cancel booking. Please try again.",
            confirmText: "OK",
            type: "danger",
            onConfirm: () => {}, // Just close the modal
          });
        }
      },
    });
  };

  const handleEmailConfirmation = (booking) => {
    showConfirmation({
      title: "Send Confirmation Email",
      message: `Send booking confirmation for ${booking.bookingId} to your email?`,
      confirmText: "Send Email",
      cancelText: "Cancel",
      type: "info",
      onConfirm: async () => {
        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showConfirmation({
          title: "Email Sent",
          message: `Confirmation email for booking ${booking.bookingId} has been sent successfully.`,
          confirmText: "OK",
          type: "success",
          onConfirm: () => {},
        });
      },
    });
  };

  const filterBookings = (bookings) => {
    let filtered = bookings;

    // Filter by tab
    const today = new Date();
    if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (b) => new Date(b.checkIn) >= today && b.status === "confirmed"
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter((b) => b.status === "completed");
    } else if (activeTab === "cancelled") {
      filtered = filtered.filter((b) => b.status === "cancelled");
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBookings = filterBookings(bookings);

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter(
      (b) => new Date(b.checkIn) >= new Date() && b.status === "confirmed"
    ).length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <>
      <BookingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleBookingSuccess}
        sendRequest={sendRequest}
        isLoading={isLoading}
      />

      {selectedBooking && (
        <ReceiptModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      <BookingsConfirmationModal
        isOpen={confirmationState.isOpen}
        onClose={hideConfirmation}
        onConfirm={handleConfirm}
        title={confirmationState.title}
        message={confirmationState.message}
        confirmText={confirmationState.confirmText}
        cancelText={confirmationState.cancelText}
        type={confirmationState.type}
        isLoading={confirmationState.isLoading}
      />

      <div className={styles.bookingsPage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.gradientOrb1}></div>
            <div className={styles.gradientOrb2}></div>
            <div className={styles.gradientOrb3}></div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>My Bookings</h1>
              <p className={styles.heroDescription}>
                Manage and track all your hotel reservations in one place
              </p>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Calendar />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>{stats.total}</div>
                  <div className={styles.statLabel}>Total Bookings</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Clock />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>{stats.upcoming}</div>
                  <div className={styles.statLabel}>Upcoming</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Check />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>{stats.completed}</div>
                  <div className={styles.statLabel}>Completed</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <X />
                </div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>{stats.cancelled}</div>
                  <div className={styles.statLabel}>Cancelled</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentContainer}>
            {/* Filters and Search */}
            <div className={styles.filterSection}>
              {/* Tabs */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${
                    activeTab === "all" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Bookings
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "upcoming" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "completed" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
                <button
                  className={`${styles.tab} ${
                    activeTab === "cancelled" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("cancelled")}
                >
                  Cancelled
                </button>

                <button
                  className={styles.createButton}
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className={styles.buttonIcon} />
                  New Booking
                </button>
              </div>

              {/* Search */}
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by hotel name, location, or booking ID..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading bookings...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className={styles.errorState}>
                <p>{error}</p>
                <button onClick={fetchBookings} className={styles.retryButton}>
                  Retry
                </button>
              </div>
            )}

            {/* Bookings List */}
            {!isLoading && !error && (
              <div className={styles.bookingsList}>
                {filteredBookings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📭</div>
                    <h3 className={styles.emptyTitle}>No bookings found</h3>
                    <p className={styles.emptyDescription}>
                      {activeTab === "upcoming"
                        ? "You don't have any upcoming bookings. Create your first booking!"
                        : "No bookings match your search criteria."}
                    </p>
                    <button
                      className={styles.primaryButton}
                      onClick={() => setIsFormOpen(true)}
                    >
                      Create New Booking
                      <ChevronRight className={styles.buttonIcon} />
                    </button>
                  </div>
                ) : (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.bookingId}
                      booking={booking}
                      onViewReceipt={setSelectedBooking}
                      onCancel={handleCancelBooking}
                      onEmailConfirmation={handleEmailConfirmation}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
