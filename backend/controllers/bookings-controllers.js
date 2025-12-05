import Booking from "../models/Booking.js";

// Get all bookings
export async function getAllBookings(req, res, next) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
}

// Get single booking by ID
export async function getBookingById(req, res, next) {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
}

// Add new booking
export async function addBookings(req, res, next) {
  try {
    const {
      hotelName,
      location,
      checkIn,
      checkOut,
      guests,
      roomType,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (
      !hotelName ||
      !location ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !roomType ||
      totalPrice == null
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Parse dates as local time (YYYY-MM-DD format)
    const [checkInYear, checkInMonth, checkInDay] = checkIn
      .split("-")
      .map(Number);
    const [checkOutYear, checkOutMonth, checkOutDay] = checkOut
      .split("-")
      .map(Number);

    const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);
    const checkOutDate = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

    // Get today at midnight local time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past",
      });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Generate unique booking ID
    let bookingId;
    let isUnique = false;

    while (!isUnique) {
      bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);
      const existingBooking = await Booking.findOne({ bookingId });
      if (!existingBooking) {
        isUnique = true;
      }
    }

    // Create new booking with confirmed status
    const newBooking = new Booking({
      hotelName,
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      roomType,
      totalPrice,
      bookingId,
      status: "confirmed", // Add default status
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
}

// Update booking (e.g., cancel)
export async function updateBooking(req, res, next) {
  try {
    const { bookingId } = req.params;
    const updates = req.body;

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      booking[key] = updates[key];
    });

    const updatedBooking = await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
}

// Delete booking
export async function deleteBooking(req, res, next) {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOneAndDelete({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
}
