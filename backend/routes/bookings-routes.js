import express from "express";
import {
  getAllBookings,
  getBookingById,
  addBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookings-controllers.js";

const router = express.Router();

// GET /api/bookings - Get all bookings
router.get("/", getAllBookings);

// GET /api/bookings/:bookingId - Get single booking
router.get("/:bookingId", getBookingById);

// POST /api/bookings - Create new booking
router.post("/", addBookings);

// PATCH /api/bookings/:bookingId - Update booking
router.patch("/:bookingId", updateBooking);

// DELETE /api/bookings/:bookingId - Delete booking
router.delete("/:bookingId", deleteBooking);

export default router;
