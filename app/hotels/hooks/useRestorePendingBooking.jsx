import { useEffect } from "react";
import { useParams } from "next/navigation";

/**
 * Custom hook to restore pending booking data after login redirect
 * Use this in the HotelDetails component
 */
export const useRestorePendingBooking = (setBookingData, setSelectedRoom) => {
  const { id } = useParams();

  useEffect(() => {
    const pendingBooking = localStorage.getItem("pendingBooking");

    if (pendingBooking) {
      try {
        const { hotelId, bookingData, selectedRoom } =
          JSON.parse(pendingBooking);

        // Only restore if we're on the same hotel page
        if (hotelId === id) {
          console.log("Restoring pending booking:", {
            bookingData,
            selectedRoom,
          });

          // Restore the booking data
          if (bookingData) {
            setBookingData(bookingData);
          }

          if (selectedRoom !== null && selectedRoom !== undefined) {
            setSelectedRoom(selectedRoom);
          }

          // Show a friendly notification to the user
          // You could add a toast notification here if you have one
          console.log("Your booking details have been restored!");
        }
      } catch (error) {
        console.error("Error restoring pending booking:", error);
        localStorage.removeItem("pendingBooking");
      }
    }
  }, [id, setBookingData, setSelectedRoom]);
};

export default useRestorePendingBooking;
