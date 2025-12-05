// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
// import styles from "./hoteldetailpage.module.css";

// // Hooks
// import { useHotelData } from "../hooks/useHotelData";
// import { useImageGallery } from "../hooks/useImageGallery";
// import { useBooking } from "../hooks/useBooking";

// // Components
// import ImageGallery from "../components/ImageGallery";
// import HotelHeader from "../components/HotelHeader";
// import HotelDescription from "../components/HotelDescription";
// import Amenities from "../components/Amenities";
// import RoomsList from "../components/RoomsList";
// import HouseRules from "../components/HouseRules";
// import ContactInfo from "../components/ContactInfo";
// import BookingCard from "../components/BookingCard";
// import PaymentModal from "../components/PaymentModal";

// const HotelDetails = () => {
//   const { id } = useParams();
//   const router = useRouter();

//   const { hotel, isLoading, error } = useHotelData(id);
//   const { currentImageIndex, handlePrevImage, handleNextImage, setImageIndex } =
//     useImageGallery(hotel?.images?.length || 0);

//   const {
//     bookingData,
//     setBookingData,
//     selectedRoom,
//     setSelectedRoom,
//     handleBookNow,
//     handlePaymentConfirm,
//     closePaymentModal,
//     showPaymentModal,
//     calculateTotalPrice,
//     calculateNights,
//     isBookingLoading,
//   } = useBooking(hotel);

//   const [isFavorite, setIsFavorite] = useState(false);

//   if (isLoading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <Loader2 className={styles.spinner} />
//         <p className={styles.loadingText}>Loading hotel details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <AlertCircle className={styles.errorIcon} />
//         <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
//         <p className={styles.errorText}>{error}</p>
//         <button
//           className={styles.backButton}
//           onClick={() => router.push("/hotels")}
//         >
//           Back to Hotels
//         </button>
//       </div>
//     );
//   }

//   if (!hotel) return null;

//   return (
//     <div className={styles.pageWrapper}>
//       <button
//         className={styles.backButtonTop}
//         onClick={() => router.push("/hotels")}
//       >
//         <ChevronLeft className={styles.backIcon} />
//         Back to Hotels
//       </button>

//       <ImageGallery
//         hotel={hotel}
//         currentImageIndex={currentImageIndex}
//         onPrev={handlePrevImage}
//         onNext={handleNextImage}
//         onSelectImage={setImageIndex}
//         isFavorite={isFavorite}
//         setIsFavorite={setIsFavorite}
//       />

//       <div className={styles.contentContainer}>
//         <div className={styles.leftColumn}>
//           <HotelHeader hotel={hotel} />
//           <HotelDescription description={hotel.description} />
//           <Amenities amenities={hotel.amenities} />
//           <RoomsList
//             rooms={hotel.rooms}
//             selectedRoom={selectedRoom}
//             onSelectRoom={setSelectedRoom}
//           />
//           <HouseRules />
//           <ContactInfo contact={hotel.contact} />
//         </div>

//         <div className={styles.rightColumn}>
//           <BookingCard
//             hotel={hotel}
//             bookingData={bookingData}
//             onBookingDataChange={setBookingData}
//             onBooking={handleBookNow}
//             totalPrice={calculateTotalPrice()}
//             nights={calculateNights()}
//             isLoading={isBookingLoading}
//           />
//         </div>
//       </div>

//       {/* Payment Modal */}
//       <PaymentModal
//         isOpen={showPaymentModal}
//         onClose={closePaymentModal}
//         onConfirm={handlePaymentConfirm}
//         bookingDetails={{
//           hotelName: hotel.name,
//           checkIn: bookingData.checkIn,
//           checkOut: bookingData.checkOut,
//           guests: bookingData.guests,
//           totalPrice: calculateTotalPrice(),
//         }}
//       />
//     </div>
//   );
// };

// export default HotelDetails;
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import styles from "./hoteldetailpage.module.css";

// Hooks
import { useHotelData } from "../hooks/useHotelData";
import { useImageGallery } from "../hooks/useImageGallery";
import { useBooking } from "../hooks/useBooking";
import { useRestorePendingBooking } from "../hooks/useRestorePendingBooking";

// Components
import ImageGallery from "../components/ImageGallery";
import HotelHeader from "../components/HotelHeader";
import HotelDescription from "../components/HotelDescription";
import Amenities from "../components/Amenities";
import RoomsList from "../components/RoomsList";
import HouseRules from "../components/HouseRules";
import ContactInfo from "../components/ContactInfo";
import BookingCard from "../components/BookingCard";
import PaymentModal from "../components/PaymentModal";
import ErrorModal from "@/app/shared/UIElements/ErrorModa";

const HotelDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const { hotel, isLoading, error } = useHotelData(id);
  const { currentImageIndex, handlePrevImage, handleNextImage, setImageIndex } =
    useImageGallery(hotel?.images?.length || 0);

  const {
    bookingData,
    setBookingData,
    selectedRoom,
    setSelectedRoom,
    handleBookNow,
    handlePaymentConfirm,
    closePaymentModal,
    showPaymentModal,
    showErrorModal,
    closeErrorModal,
    validationErrors,
    calculateTotalPrice,
    calculateNights,
    isBookingLoading,
  } = useBooking(hotel);

  // Restore pending booking data after login redirect
  useRestorePendingBooking(setBookingData, setSelectedRoom);

  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
        <p className={styles.loadingText}>Loading hotel details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
        <p className={styles.errorText}>{error}</p>
        <button
          className={styles.backButton}
          onClick={() => router.push("/hotels")}
        >
          Back to Hotels
        </button>
      </div>
    );
  }

  if (!hotel) return null;

  return (
    <div className={styles.pageWrapper}>
      <button
        className={styles.backButtonTop}
        onClick={() => router.push("/hotels")}
      >
        <ChevronLeft className={styles.backIcon} />
        Back to Hotels
      </button>

      <ImageGallery
        hotel={hotel}
        currentImageIndex={currentImageIndex}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        onSelectImage={setImageIndex}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
      />

      <div className={styles.contentContainer}>
        <div className={styles.leftColumn}>
          <HotelHeader hotel={hotel} />
          <HotelDescription description={hotel.description} />
          <Amenities amenities={hotel.amenities} />
          <RoomsList
            rooms={hotel.rooms}
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
          />
          <HouseRules />
          <ContactInfo contact={hotel.contact} />
        </div>

        <div className={styles.rightColumn}>
          <BookingCard
            hotel={hotel}
            bookingData={bookingData}
            onBookingDataChange={setBookingData}
            onBooking={handleBookNow}
            totalPrice={calculateTotalPrice()}
            nights={calculateNights()}
            isLoading={isBookingLoading}
          />
        </div>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        errors={validationErrors}
        title="Booking Validation Error"
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
        onConfirm={handlePaymentConfirm}
        bookingDetails={{
          hotelName: hotel.name,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          totalPrice: calculateTotalPrice(),
        }}
      />
    </div>
  );
};

export default HotelDetails;
