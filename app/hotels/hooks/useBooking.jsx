// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useHttp } from "@/app/shared/hooks/useHttpHook";

// export const useBooking = (hotel) => {
//   const { sendRequest, isLoading } = useHttp();
//   const router = useRouter();

//   const [bookingData, setBookingData] = useState({
//     checkIn: "",
//     checkOut: "",
//     guests: 2,
//   });
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   const calculateTotalPrice = () => {
//     if (!bookingData.checkIn || !bookingData.checkOut)
//       return hotel?.pricePerNight || 0;

//     const checkIn = new Date(bookingData.checkIn);
//     const checkOut = new Date(bookingData.checkOut);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

//     return nights > 0
//       ? (hotel?.pricePerNight || 0) * nights
//       : hotel?.pricePerNight || 0;
//   };

//   const calculateNights = () => {
//     if (!bookingData.checkIn || !bookingData.checkOut) return 1;

//     const checkIn = new Date(bookingData.checkIn);
//     const checkOut = new Date(bookingData.checkOut);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

//     return nights > 0 ? nights : 1;
//   };

//   const validateBooking = () => {
//     const errors = [];

//     if (!bookingData.checkIn) {
//       errors.push("Please select a check-in date");
//     }

//     if (!bookingData.checkOut) {
//       errors.push("Please select a check-out date");
//     }

//     if (bookingData.checkIn && bookingData.checkOut) {
//       const checkIn = new Date(bookingData.checkIn);
//       const checkOut = new Date(bookingData.checkOut);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       if (checkIn < today) {
//         errors.push("Check-in date cannot be in the past");
//       }

//       if (checkIn >= checkOut) {
//         errors.push("Check-out date must be after check-in date");
//       }
//     }

//     return errors;
//   };

//   const handleBookNow = () => {
//     const errors = validateBooking();

//     if (errors.length > 0) {
//       alert(errors.join("\n"));
//       return;
//     }

//     // Open payment modal
//     setShowPaymentModal(true);
//   };

//   const handlePaymentConfirm = async (paymentData) => {
//     try {
//       const totalPrice = calculateTotalPrice();
//       const roomType =
//         selectedRoom !== null && hotel.rooms?.[selectedRoom]
//           ? hotel.rooms[selectedRoom].type
//           : "Standard Room";

//       const bookingPayload = {
//         hotelName: hotel.name,
//         location: `${hotel.location?.city}, ${hotel.location?.country}`,
//         checkIn: bookingData.checkIn,
//         checkOut: bookingData.checkOut,
//         guests: bookingData.guests,
//         roomType: roomType,
//         totalPrice: totalPrice,
//         paymentMethod: paymentData.savedCardId
//           ? { type: "saved", cardId: paymentData.savedCardId }
//           : {
//               type: "new",
//               cardHolder: paymentData.cardHolder,
//               cardNumber: paymentData.cardNumber,
//               saveCard: paymentData.saveCard,
//             },
//       };

//       console.log("Creating booking with data:", bookingPayload);

//       const response = await sendRequest("/bookings", "POST", bookingPayload);

//       if (response.success) {
//         alert(
//           `Booking successful! Your booking ID is: ${response.data.bookingId}`
//         );
//         router.push("/bookings");
//       }
//     } catch (err) {
//       console.error("Booking error:", err);
//       throw err; // Let the modal handle the error display
//     }
//   };

//   const closePaymentModal = () => {
//     setShowPaymentModal(false);
//   };

//   return {
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
//     isBookingLoading: isLoading,
//   };
// };

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHttp } from "@/app/shared/hooks/useHttpHook";
import { useAuth } from "@/app/shared/Context/AuthContext";

export const useBooking = (hotel) => {
  const { sendRequest, isLoading } = useHttp();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth(); // Use AuthContext

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut)
      return hotel?.pricePerNight || 0;

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    return nights > 0
      ? (hotel?.pricePerNight || 0) * nights
      : hotel?.pricePerNight || 0;
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 1;

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 1;
  };

  const validateBooking = () => {
    const errors = [];

    if (!bookingData.checkIn) {
      errors.push("Please select a check-in date");
    }

    if (!bookingData.checkOut) {
      errors.push("Please select a check-out date");
    }

    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkIn < today) {
        errors.push("Check-in date cannot be in the past");
      }

      if (checkIn >= checkOut) {
        errors.push("Check-out date must be after check-in date");
      }
    }

    return errors;
  };

  const handleBookNow = () => {
    // First check if user is logged in using AuthContext
    if (!isAuthenticated || !user) {
      // Save current booking data to localStorage for after login
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          hotelId: hotel._id,
          bookingData,
          selectedRoom,
        })
      );

      // Redirect to login page
      router.push("/login");
      return;
    }

    // Validate booking dates
    const errors = validateBooking();

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrorModal(true);
      return;
    }

    // Open payment modal if validation passes
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async (paymentData) => {
    try {
      const totalPrice = calculateTotalPrice();
      const roomType =
        selectedRoom !== null && hotel.rooms?.[selectedRoom]
          ? hotel.rooms[selectedRoom].type
          : "Standard Room";

      const bookingPayload = {
        hotelName: hotel.name,
        location: `${hotel.location?.city}, ${hotel.location?.country}`,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        roomType: roomType,
        totalPrice: totalPrice,
        paymentMethod: paymentData.savedCardId
          ? { type: "saved", cardId: paymentData.savedCardId }
          : {
              type: "new",
              cardHolder: paymentData.cardHolder,
              cardNumber: paymentData.cardNumber,
              saveCard: paymentData.saveCard,
            },
      };

      console.log("Creating booking with data:", bookingPayload);

      const response = await sendRequest("/bookings", "POST", bookingPayload);

      if (response.success) {
        // Clear pending booking if it exists
        localStorage.removeItem("pendingBooking");

        alert(
          `Booking successful! Your booking ID is: ${response.data.bookingId}`
        );
        router.push("/bookings");
      }
    } catch (err) {
      console.error("Booking error:", err);
      throw err; // Let the modal handle the error display
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setValidationErrors([]);
  };

  return {
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
    isBookingLoading: isLoading,
  };
};
