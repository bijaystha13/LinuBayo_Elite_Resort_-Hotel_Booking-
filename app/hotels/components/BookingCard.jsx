// import React from "react";
// import { Calendar, User } from "lucide-react";
// import styles from "../[id]/hoteldetailpage.module.css";

// const BookingCard = ({
//   hotel,
//   bookingData,
//   onBookingDataChange,
//   onBooking,
//   totalPrice,
//   nights,
//   isLoading,
// }) => (
//   <div className={styles.bookingCard}>
//     <div className={styles.bookingHeader}>
//       <div className={styles.bookingPrice}>
//         <span className={styles.priceAmount}>${hotel.pricePerNight}</span>
//         <span className={styles.priceLabel}>per night</span>
//       </div>
//     </div>

//     <div className={styles.bookingForm}>
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           <Calendar className={styles.labelIcon} />
//           Check-in
//         </label>
//         <input
//           type="date"
//           className={styles.formInput}
//           value={bookingData.checkIn}
//           onChange={(e) =>
//             onBookingDataChange({ ...bookingData, checkIn: e.target.value })
//           }
//           min={new Date().toISOString().split("T")[0]}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           <Calendar className={styles.labelIcon} />
//           Check-out
//         </label>
//         <input
//           type="date"
//           className={styles.formInput}
//           value={bookingData.checkOut}
//           onChange={(e) =>
//             onBookingDataChange({
//               ...bookingData,
//               checkOut: e.target.value,
//             })
//           }
//           min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>
//           <User className={styles.labelIcon} />
//           Guests
//         </label>
//         <select
//           className={styles.formInput}
//           value={bookingData.guests}
//           onChange={(e) =>
//             onBookingDataChange({
//               ...bookingData,
//               guests: Number(e.target.value),
//             })
//           }
//         >
//           <option value={1}>1 Guest</option>
//           <option value={2}>2 Guests</option>
//           <option value={3}>3 Guests</option>
//           <option value={4}>4 Guests</option>
//           <option value={5}>5+ Guests</option>
//         </select>
//       </div>

//       <button
//         className={styles.bookButton}
//         onClick={onBooking}
//         disabled={isLoading}
//       >
//         {isLoading ? "Processing..." : "Book Now"}
//       </button>

//       <p className={styles.bookingNote}>You won&apos;t be charged yet</p>
//     </div>

//     <div className={styles.priceBreakdown}>
//       <div className={styles.breakdownRow}>
//         <span>
//           ${hotel.pricePerNight} x {nights} {nights === 1 ? "night" : "nights"}
//         </span>
//         <span>${totalPrice}</span>
//       </div>
//       <div className={styles.breakdownRow}>
//         <span>Service fee</span>
//         <span>$0</span>
//       </div>
//       <div className={styles.breakdownDivider}></div>
//       <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
//         <span>Total</span>
//         <span>${totalPrice}</span>
//       </div>
//     </div>
//   </div>
// );

// export default BookingCard;

import React from "react";
import { Calendar, User } from "lucide-react";
import styles from "../[id]/hoteldetailpage.module.css";

const BookingCard = ({
  hotel,
  bookingData,
  onBookingDataChange,
  onBooking,
  totalPrice,
  nights,
  isLoading,
}) => (
  <div className={styles.bookingCard}>
    <div className={styles.bookingHeader}>
      <div className={styles.bookingPrice}>
        <span className={styles.priceAmount}>${hotel.pricePerNight}</span>
        <span className={styles.priceLabel}>per night</span>
      </div>
    </div>

    <div className={styles.bookingForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          <Calendar className={styles.labelIcon} />
          Check-in
        </label>
        <input
          type="date"
          className={styles.formInput}
          value={bookingData.checkIn}
          onChange={(e) =>
            onBookingDataChange({ ...bookingData, checkIn: e.target.value })
          }
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          <Calendar className={styles.labelIcon} />
          Check-out
        </label>
        <input
          type="date"
          className={styles.formInput}
          value={bookingData.checkOut}
          onChange={(e) =>
            onBookingDataChange({
              ...bookingData,
              checkOut: e.target.value,
            })
          }
          min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          <User className={styles.labelIcon} />
          Guests
        </label>
        <select
          className={styles.formInput}
          value={bookingData.guests}
          onChange={(e) =>
            onBookingDataChange({
              ...bookingData,
              guests: Number(e.target.value),
            })
          }
        >
          <option value={1}>1 Guest</option>
          <option value={2}>2 Guests</option>
          <option value={3}>3 Guests</option>
          <option value={4}>4 Guests</option>
          <option value={5}>5+ Guests</option>
        </select>
      </div>

      <button
        className={styles.bookButton}
        onClick={onBooking}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Book Now"}
      </button>

      <p className={styles.bookingNote}>You won&apos;t be charged yet</p>
    </div>

    <div className={styles.priceBreakdown}>
      <div className={styles.breakdownRow}>
        <span>
          ${hotel.pricePerNight} x {nights} {nights === 1 ? "night" : "nights"}
        </span>
        <span>${totalPrice}</span>
      </div>
      <div className={styles.breakdownRow}>
        <span>Service fee</span>
        <span>$0</span>
      </div>
      <div className={styles.breakdownDivider}></div>
      <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  </div>
);

export default BookingCard;
