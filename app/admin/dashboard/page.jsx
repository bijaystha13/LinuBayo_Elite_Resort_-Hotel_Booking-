"use client";

// import React, { useState } from "react";
// import {
//   Users,
//   Hotel,
//   Calendar,
//   TrendingUp,
//   DollarSign,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   ArrowUp,
//   ArrowDown,
//   BedDouble,
//   UserCheck,
//   LogOut as LogOutIcon,
//   Star,
//   MapPin,
// } from "lucide-react";
// import styles from "./admindashboard.module.css";

// const AdminDashboard = () => {
//   const [timeRange, setTimeRange] = useState("today");

//   // Mock data - replace with real API calls
//   const stats = {
//     totalGuests: 1247,
//     guestsChange: 12.5,
//     occupancyRate: 87,
//     occupancyChange: 5.2,
//     revenue: 45890,
//     revenueChange: 18.3,
//     checkIns: 24,
//     checkInsChange: -3.1,
//   };

//   const todayArrivals = [
//     {
//       id: 1,
//       guest: "Sarah Johnson",
//       room: "Deluxe Suite 301",
//       time: "2:00 PM",
//       status: "confirmed",
//     },
//     {
//       id: 2,
//       guest: "Michael Chen",
//       room: "Ocean View 205",
//       time: "3:30 PM",
//       status: "confirmed",
//     },
//     {
//       id: 3,
//       guest: "Emily Rodriguez",
//       room: "Premium Room 412",
//       time: "4:15 PM",
//       status: "pending",
//     },
//     {
//       id: 4,
//       guest: "David Kim",
//       room: "Executive Suite 501",
//       time: "5:00 PM",
//       status: "confirmed",
//     },
//   ];

//   const todayDepartures = [
//     {
//       id: 1,
//       guest: "James Wilson",
//       room: "Standard Room 102",
//       time: "11:00 AM",
//       status: "checked-out",
//     },
//     {
//       id: 2,
//       guest: "Lisa Anderson",
//       room: "Deluxe Room 208",
//       time: "12:00 PM",
//       status: "pending",
//     },
//     {
//       id: 3,
//       guest: "Robert Taylor",
//       room: "Suite 405",
//       time: "2:00 PM",
//       status: "pending",
//     },
//   ];

//   const roomStatus = [
//     { type: "Available", count: 45, color: "#10b981" },
//     { type: "Occupied", count: 87, color: "#667eea" },
//     { type: "Maintenance", count: 5, color: "#f59e0b" },
//     { type: "Reserved", count: 13, color: "#8b5cf6" },
//   ];

//   const recentBookings = [
//     {
//       id: 1,
//       guest: "Alice Cooper",
//       room: "Ocean View Suite",
//       checkIn: "Dec 15, 2024",
//       checkOut: "Dec 18, 2024",
//       amount: "$450",
//       status: "confirmed",
//     },
//     {
//       id: 2,
//       guest: "Bob Martinez",
//       room: "Deluxe Room",
//       checkIn: "Dec 16, 2024",
//       checkOut: "Dec 20, 2024",
//       amount: "$380",
//       status: "pending",
//     },
//     {
//       id: 3,
//       guest: "Carol White",
//       room: "Premium Suite",
//       checkIn: "Dec 17, 2024",
//       checkOut: "Dec 19, 2024",
//       amount: "$520",
//       status: "confirmed",
//     },
//   ];

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <div className={styles.dashboard}>
//       {/* Header */}
//       <div className={styles.dashboardHeader}>
//         <div className={styles.headerContent}>
//           <div>
//             <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>
//             <p className={styles.dashboardSubtitle}>
//               Welcome back! Here's what's happening today.
//             </p>
//           </div>
//           <div className={styles.headerActions}>
//             <select
//               className={styles.timeRangeSelect}
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//             >
//               <option value="today">Today</option>
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//               <option value="year">This Year</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ background: "#667eea" }}>
//             <Users className={styles.icon} />
//           </div>
//           <div className={styles.statContent}>
//             <p className={styles.statLabel}>Total Guests</p>
//             <h3 className={styles.statValue}>{stats.totalGuests}</h3>
//             <div
//               className={`${styles.statChange} ${
//                 stats.guestsChange > 0 ? styles.positive : styles.negative
//               }`}
//             >
//               {stats.guestsChange > 0 ? (
//                 <ArrowUp className={styles.changeIcon} />
//               ) : (
//                 <ArrowDown className={styles.changeIcon} />
//               )}
//               <span>{Math.abs(stats.guestsChange)}% from last period</span>
//             </div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ background: "#10b981" }}>
//             <TrendingUp className={styles.icon} />
//           </div>
//           <div className={styles.statContent}>
//             <p className={styles.statLabel}>Occupancy Rate</p>
//             <h3 className={styles.statValue}>{stats.occupancyRate}%</h3>
//             <div
//               className={`${styles.statChange} ${
//                 stats.occupancyChange > 0 ? styles.positive : styles.negative
//               }`}
//             >
//               {stats.occupancyChange > 0 ? (
//                 <ArrowUp className={styles.changeIcon} />
//               ) : (
//                 <ArrowDown className={styles.changeIcon} />
//               )}
//               <span>{Math.abs(stats.occupancyChange)}% from last period</span>
//             </div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ background: "#f59e0b" }}>
//             <DollarSign className={styles.icon} />
//           </div>
//           <div className={styles.statContent}>
//             <p className={styles.statLabel}>Revenue</p>
//             <h3 className={styles.statValue}>
//               {formatCurrency(stats.revenue)}
//             </h3>
//             <div
//               className={`${styles.statChange} ${
//                 stats.revenueChange > 0 ? styles.positive : styles.negative
//               }`}
//             >
//               {stats.revenueChange > 0 ? (
//                 <ArrowUp className={styles.changeIcon} />
//               ) : (
//                 <ArrowDown className={styles.changeIcon} />
//               )}
//               <span>{Math.abs(stats.revenueChange)}% from last period</span>
//             </div>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statIcon} style={{ background: "#8b5cf6" }}>
//             <UserCheck className={styles.icon} />
//           </div>
//           <div className={styles.statContent}>
//             <p className={styles.statLabel}>Today's Check-ins</p>
//             <h3 className={styles.statValue}>{stats.checkIns}</h3>
//             <div
//               className={`${styles.statChange} ${
//                 stats.checkInsChange > 0 ? styles.positive : styles.negative
//               }`}
//             >
//               {stats.checkInsChange > 0 ? (
//                 <ArrowUp className={styles.changeIcon} />
//               ) : (
//                 <ArrowDown className={styles.changeIcon} />
//               )}
//               <span>{Math.abs(stats.checkInsChange)}% from yesterday</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className={styles.contentGrid}>
//         {/* Today's Arrivals */}
//         <div className={styles.card}>
//           <div className={styles.cardHeader}>
//             <h2 className={styles.cardTitle}>Today's Arrivals</h2>
//             <span className={styles.badge}>{todayArrivals.length} Guests</span>
//           </div>
//           <div className={styles.cardContent}>
//             {todayArrivals.map((arrival) => (
//               <div key={arrival.id} className={styles.listItem}>
//                 <div className={styles.listItemContent}>
//                   <div className={styles.guestInfo}>
//                     <div className={styles.guestAvatar}>
//                       {arrival.guest.charAt(0)}
//                     </div>
//                     <div>
//                       <p className={styles.guestName}>{arrival.guest}</p>
//                       <p className={styles.roomNumber}>{arrival.room}</p>
//                     </div>
//                   </div>
//                   <div className={styles.arrivalTime}>
//                     <Clock className={styles.timeIcon} />
//                     <span>{arrival.time}</span>
//                   </div>
//                   <span
//                     className={`${styles.statusBadge} ${
//                       styles[arrival.status]
//                     }`}
//                   >
//                     {arrival.status === "confirmed" ? (
//                       <CheckCircle className={styles.statusIcon} />
//                     ) : (
//                       <AlertCircle className={styles.statusIcon} />
//                     )}
//                     {arrival.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Today's Departures */}
//         <div className={styles.card}>
//           <div className={styles.cardHeader}>
//             <h2 className={styles.cardTitle}>Today's Departures</h2>
//             <span className={styles.badge}>
//               {todayDepartures.length} Guests
//             </span>
//           </div>
//           <div className={styles.cardContent}>
//             {todayDepartures.map((departure) => (
//               <div key={departure.id} className={styles.listItem}>
//                 <div className={styles.listItemContent}>
//                   <div className={styles.guestInfo}>
//                     <div className={styles.guestAvatar}>
//                       {departure.guest.charAt(0)}
//                     </div>
//                     <div>
//                       <p className={styles.guestName}>{departure.guest}</p>
//                       <p className={styles.roomNumber}>{departure.room}</p>
//                     </div>
//                   </div>
//                   <div className={styles.arrivalTime}>
//                     <Clock className={styles.timeIcon} />
//                     <span>{departure.time}</span>
//                   </div>
//                   <span
//                     className={`${styles.statusBadge} ${
//                       styles[departure.status.replace("-", "")]
//                     }`}
//                   >
//                     {departure.status === "checked-out" ? (
//                       <CheckCircle className={styles.statusIcon} />
//                     ) : (
//                       <AlertCircle className={styles.statusIcon} />
//                     )}
//                     {departure.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Room Status */}
//         <div className={styles.card}>
//           <div className={styles.cardHeader}>
//             <h2 className={styles.cardTitle}>Room Status</h2>
//             <BedDouble className={styles.cardIcon} />
//           </div>
//           <div className={styles.cardContent}>
//             <div className={styles.roomStatusGrid}>
//               {roomStatus.map((status, index) => (
//                 <div key={index} className={styles.roomStatusItem}>
//                   <div
//                     className={styles.roomStatusIndicator}
//                     style={{ background: status.color }}
//                   ></div>
//                   <div className={styles.roomStatusInfo}>
//                     <p className={styles.roomStatusLabel}>{status.type}</p>
//                     <p className={styles.roomStatusCount}>
//                       {status.count} Rooms
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.totalRooms}>
//               <span>Total Rooms</span>
//               <span className={styles.totalRoomsCount}>
//                 {roomStatus.reduce((acc, curr) => acc + curr.count, 0)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Recent Bookings */}
//         <div className={`${styles.card} ${styles.fullWidth}`}>
//           <div className={styles.cardHeader}>
//             <h2 className={styles.cardTitle}>Recent Bookings</h2>
//             <Calendar className={styles.cardIcon} />
//           </div>
//           <div className={styles.cardContent}>
//             <div className={styles.tableContainer}>
//               <table className={styles.table}>
//                 <thead>
//                   <tr>
//                     <th>Guest Name</th>
//                     <th>Room Type</th>
//                     <th>Check-in</th>
//                     <th>Check-out</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentBookings.map((booking) => (
//                     <tr key={booking.id}>
//                       <td>
//                         <div className={styles.tableGuestInfo}>
//                           <div className={styles.tableGuestAvatar}>
//                             {booking.guest.charAt(0)}
//                           </div>
//                           <span>{booking.guest}</span>
//                         </div>
//                       </td>
//                       <td>{booking.room}</td>
//                       <td>{booking.checkIn}</td>
//                       <td>{booking.checkOut}</td>
//                       <td className={styles.tableAmount}>{booking.amount}</td>
//                       <td>
//                         <span
//                           className={`${styles.tableStatusBadge} ${
//                             styles[booking.status]
//                           }`}
//                         >
//                           {booking.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState } from "react";
import styles from "./style.module.css";

const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState("in-house");
  const [searchTerm, setSearchTerm] = useState("");

  // Quick Actions Data
  const quickActions = [
    { id: 1, icon: "🚶", label: "Walk-In", color: "#667eea" },
    { id: 2, icon: "📝", label: "New Reservation", color: "#764ba2" },
    { id: 3, icon: "✅", label: "Check-Out", color: "#4facfe" },
    { id: 4, icon: "🔄", label: "Change Stay", color: "#f093fb" },
    { id: 5, icon: "📋", label: "Reservation", color: "#f5576c" },
    { id: 6, icon: "💳", label: "Reg Card", color: "#4caf50" },
    { id: 7, icon: "📄", label: "Guest Folio", color: "#ffc107" },
    { id: 8, icon: "💰", label: "Post Charges", color: "#667eea" },
    { id: 9, icon: "💵", label: "Post Payment", color: "#764ba2" },
  ];

  // Sample In-House Guests
  const inHouseGuests = [
    {
      id: 1,
      room: "1002",
      roomType: "DEV-DLX",
      guestName: "Black, Helen",
      dateIn: "02-Jul-2019",
      dateOut: "03-Sep-2019",
      stay: 23,
      resId: 38392,
      rate: 250.0,
      adults: 2,
      children: 3,
      rateCode: "Corporate Bronze",
      status: "checked-in",
      balance: 1500.0,
    },
    {
      id: 2,
      room: "1005",
      roomType: "Suite",
      guestName: "Johnson, Sarah",
      dateIn: "05-Dec-2024",
      dateOut: "10-Dec-2024",
      stay: 5,
      resId: 38393,
      rate: 350.0,
      adults: 2,
      children: 0,
      rateCode: "Premium",
      status: "checked-in",
      balance: 750.0,
    },
    {
      id: 3,
      room: "2015",
      roomType: "Double",
      guestName: "Martinez, Carlos",
      dateIn: "04-Dec-2024",
      dateOut: "08-Dec-2024",
      stay: 4,
      resId: 38394,
      rate: 180.0,
      adults: 2,
      children: 1,
      rateCode: "Standard",
      status: "checked-in",
      balance: 360.0,
    },
    {
      id: 4,
      room: "3022",
      roomType: "Single",
      guestName: "Chen, Wei",
      dateIn: "03-Dec-2024",
      dateOut: "06-Dec-2024",
      stay: 3,
      resId: 38395,
      rate: 120.0,
      adults: 1,
      children: 0,
      rateCode: "Business",
      status: "checked-in",
      balance: 240.0,
    },
  ];

  // Sample Arrivals
  const arrivals = [
    {
      id: 1,
      room: "1101",
      roomType: "Suite",
      guestName: "Anderson, Lisa",
      dateIn: "05-Dec-2024",
      dateOut: "09-Dec-2024",
      stay: 4,
      resId: 38396,
      rate: 380.0,
      adults: 2,
      children: 0,
      rateCode: "Premium Plus",
      status: "expected",
    },
    {
      id: 2,
      room: "2205",
      roomType: "Double",
      guestName: "Wilson, James",
      dateIn: "05-Dec-2024",
      dateOut: "07-Dec-2024",
      stay: 2,
      resId: 38397,
      rate: 190.0,
      adults: 2,
      children: 2,
      rateCode: "Family",
      status: "expected",
    },
  ];

  // Dashboard Stats
  const dashboardStats = {
    totalRooms: 150,
    occupied: 87,
    available: 45,
    maintenance: 8,
    reserved: 10,
    occupancyRate: 58.0,
    todayArrivals: 12,
    todayDepartures: 8,
    inHouseGuests: 87,
    todayRevenue: 12450,
  };

  const filteredGuests = inHouseGuests.filter(
    (guest) =>
      guest.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.room.includes(searchTerm) ||
      guest.resId.toString().includes(searchTerm)
  );

  const currentData = selectedView === "in-house" ? filteredGuests : arrivals;

  return (
    <div className={styles.dashboardPage}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>🏨</div>
          <div className={styles.hotelInfo}>
            <h1 className={styles.hotelName}>Hotel Management</h1>
            <p className={styles.hotelSubtitle}>Property Management System</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.dateDisplay}>
            <span className={styles.dateIcon}>📅</span>
            <span className={styles.dateText}>Thursday, December 05, 2024</span>
          </div>
          <button className={styles.userButton}>
            <span className={styles.userIcon}>👤</span>
            <span>ADMIN.RSI</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className={styles.container}>
        {/* Quick Actions */}
        <div className={styles.quickActionsSection}>
          <div className={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <button key={action.id} className={styles.actionButton}>
                <span className={styles.actionIcon}>{action.icon}</span>
                <span className={styles.actionLabel}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏨</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {dashboardStats.occupied}/{dashboardStats.totalRooms}
                </div>
                <div className={styles.statLabel}>Occupied Rooms</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {dashboardStats.occupancyRate}%
                </div>
                <div className={styles.statLabel}>Occupancy Rate</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📥</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {dashboardStats.todayArrivals}
                </div>
                <div className={styles.statLabel}>Today's Arrivals</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📤</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {dashboardStats.todayDepartures}
                </div>
                <div className={styles.statLabel}>Departures</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {dashboardStats.available}
                </div>
                <div className={styles.statLabel}>Available</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  ${dashboardStats.todayRevenue}
                </div>
                <div className={styles.statLabel}>Today's Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Views</div>
            <button
              className={`${styles.sidebarButton} ${
                selectedView === "in-house" ? styles.active : ""
              }`}
              onClick={() => setSelectedView("in-house")}
            >
              In-House
            </button>
            <button
              className={`${styles.sidebarButton} ${
                selectedView === "arrivals" ? styles.active : ""
              }`}
              onClick={() => setSelectedView("arrivals")}
            >
              Arrivals
            </button>
            <button className={styles.sidebarButton}>Departures</button>
            <button className={styles.sidebarButton}>Checked-Out</button>
            <button className={styles.sidebarButton}>No-Shows</button>
            <button className={styles.sidebarButton}>Cancelled</button>
            <button className={styles.sidebarButton}>Wait List</button>
            <button className={styles.sidebarButton}>Tape Chart</button>
          </div>

          {/* Guest Table */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>
                {selectedView === "in-house"
                  ? "In-House Guests"
                  : "Expected Arrivals"}
              </div>
              <div className={styles.searchBox}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, room, or ID..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.guestTable}>
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Room Type</th>
                    <th>Name</th>
                    <th>Date In</th>
                    <th>Date Out</th>
                    <th>Stay</th>
                    <th>Res ID</th>
                    <th>Rate</th>
                    <th>Adult</th>
                    <th>Child</th>
                    <th>Rate Code</th>
                    {selectedView === "in-house" && <th>Balance</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((guest) => (
                    <tr key={guest.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.roomNumber}>{guest.room}</div>
                      </td>
                      <td>{guest.roomType}</td>
                      <td>
                        <div className={styles.guestName}>
                          {guest.guestName}
                        </div>
                      </td>
                      <td>{guest.dateIn}</td>
                      <td>{guest.dateOut}</td>
                      <td>{guest.stay}</td>
                      <td className={styles.resId}>{guest.resId}</td>
                      <td className={styles.rateAmount}>
                        ${guest.rate.toFixed(2)}
                      </td>
                      <td>{guest.adults}</td>
                      <td>{guest.children}</td>
                      <td>{guest.rateCode}</td>
                      {selectedView === "in-house" && (
                        <td className={styles.balance}>
                          ${guest.balance.toFixed(2)}
                        </td>
                      )}
                      <td>
                        <div className={styles.actionButtons}>
                          <button className={styles.actionIcon}>👁️</button>
                          <button className={styles.actionIcon}>✏️</button>
                          <button className={styles.actionIcon}>📄</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomInfo}>
            <span>ADMIN.RSI</span>
            <span className={styles.separator}>|</span>
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className={styles.bottomActions}>
            <button className={styles.bottomButton}>
              Smart Backup Available
            </button>
            <button className={styles.bottomButton}>
              System Status: Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
