import Hotels from "../models/Hotels.js";
import HttpError from "../models/HttpError.js";

export async function getAllHotels(req, res, next) {
  try {
    const {
      type,
      city,
      country,
      minPrice,
      maxPrice,
      featured,
      minRating,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    if (country) {
      filter["location.country"] = { $regex: country, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // Build sort object
    let sortOption = {};
    if (sort) {
      switch (sort) {
        case "price-asc":
          sortOption = { pricePerNight: 1 };
          break;
        case "price-desc":
          sortOption = { pricePerNight: -1 };
          break;
        case "rating-desc":
          sortOption = { rating: -1 };
          break;
        case "rating-asc":
          sortOption = { rating: 1 };
          break;
        case "name-asc":
          sortOption = { name: 1 };
          break;
        case "name-desc":
          sortOption = { name: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    } else {
      sortOption = { createdAt: -1 };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const hotels = await Hotels.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    // Transform hotels to include images array for frontend compatibility
    const transformedHotels = hotels.map((hotel) => {
      const hotelObj = hotel.toObject();

      // Convert image string to images array
      if (hotelObj.image && !hotelObj.images) {
        hotelObj.images = [hotelObj.image];
      }

      return hotelObj;
    });

    // Get total count for pagination
    const totalHotels = await Hotels.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: transformedHotels, // Use transformed hotels
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalHotels / Number(limit)),
        totalHotels,
        hotelsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return next(
      new HttpError("Failed to fetch hotels. Please try again later.", 500)
    );
  }
}

// Get single hotel by ID
export async function getHotelById(req, res, next) {
  const { id } = req.params;

  try {
    const hotel = await Hotels.findById(id);

    if (!hotel) {
      return next(new HttpError("Hotel not found.", 404));
    }

    const hotelObj = hotel.toObject();

    // Convert image string to images array
    if (hotelObj.image && !hotelObj.images) {
      hotelObj.images = [hotelObj.image];
    }

    res.status(200).json({
      success: true,
      data: hotelObj,
    });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return next(new HttpError("Failed to fetch hotel. Please try again.", 500));
  }
}

// Get featured hotels
export async function getFeaturedHotels(req, res, next) {
  try {
    const { limit = 6 } = req.query;

    const hotels = await Hotels.find({ featured: true })
      .sort({ rating: -1 })
      .limit(Number(limit));

    const transformedHotels = hotels.map((hotel) => {
      const hotelObj = hotel.toObject();
      if (hotelObj.image && !hotelObj.images) {
        hotelObj.images = [hotelObj.image];
      }
      return hotelObj;
    });

    res.status(200).json({
      success: true,
      data: transformedHotels,
      count: transformedHotels.length,
    });
  } catch (error) {
    console.error("Error fetching featured hotels:", error);
    return next(
      new HttpError(
        "Failed to fetch featured hotels. Please try again later.",
        500
      )
    );
  }
}

// Get hotels by type
export async function getHotelsByType(req, res, next) {
  const { type } = req.params;

  try {
    const hotels = await Hotels.find({ type }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: hotels,
      count: hotels.length,
    });
  } catch (error) {
    console.error("Error fetching hotels by type:", error);
    return next(
      new HttpError("Failed to fetch hotels by type. Please try again.", 500)
    );
  }
}

// Get hotels by location
export async function getHotelsByLocation(req, res, next) {
  const { city, country } = req.query;

  try {
    const filter = {};
    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (country)
      filter["location.country"] = { $regex: country, $options: "i" };

    const hotels = await Hotels.find(filter).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: hotels,
      count: hotels.length,
    });
  } catch (error) {
    console.error("Error fetching hotels by location:", error);
    return next(
      new HttpError(
        "Failed to fetch hotels by location. Please try again.",
        500
      )
    );
  }
}

// Get all unique hotel types
export async function getHotelTypes(req, res, next) {
  try {
    const types = await Hotels.distinct("type");

    res.status(200).json({
      success: true,
      data: types,
    });
  } catch (error) {
    console.error("Error fetching hotel types:", error);
    return next(
      new HttpError("Failed to fetch hotel types. Please try again.", 500)
    );
  }
}

// Get all unique locations
export async function getLocations(req, res, next) {
  try {
    const locations = await Hotels.aggregate([
      {
        $group: {
          _id: {
            city: "$location.city",
            country: "$location.country",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          country: "$_id.country",
          hotelCount: "$count",
        },
      },
      {
        $sort: { hotelCount: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return next(
      new HttpError("Failed to fetch locations. Please try again.", 500)
    );
  }
}

// Search hotels by name
export async function searchHotels(req, res, next) {
  const { query } = req.query;

  if (!query) {
    return next(new HttpError("Search query is required.", 400));
  }

  try {
    const hotels = await Hotels.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { "location.city": { $regex: query, $options: "i" } },
        { "location.country": { $regex: query, $options: "i" } },
      ],
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: hotels,
      count: hotels.length,
    });
  } catch (error) {
    console.error("Error searching hotels:", error);
    return next(
      new HttpError("Failed to search hotels. Please try again.", 500)
    );
  }
}
