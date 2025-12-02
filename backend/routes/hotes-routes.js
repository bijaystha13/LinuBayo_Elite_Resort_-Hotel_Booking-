import express from "express";
import {
  getAllHotels,
  getHotelById,
  getFeaturedHotels,
  getHotelsByType,
  getHotelsByLocation,
  getHotelTypes,
  getLocations,
  searchHotels,
} from "../controllers/hotels-controllers.js";

const router = express.Router();

// Get all hotels with filters
router.get("/", getAllHotels);

// Get single hotel by ID (must be before other routes with params)
router.get("/:id", getHotelById);

// Get featured hotels
router.get("/featured", getFeaturedHotels);

// Get hotels by type
router.get("/type/:type", getHotelsByType);

// Get hotels by location
router.get("/location", getHotelsByLocation);

// Get all hotel types
router.get("/types", getHotelTypes);

// Get all locations
router.get("/locations", getLocations);

// Search hotels
router.get("/search", searchHotels);

export default router;
