import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Hotels from "./models/Hotels.js";

dotenv.config();

const sampleHotels = [
  // Luxury Resorts
  {
    name: "Paradise Bay Resort",
    type: "Luxury Resort",
    location: {
      city: "Maldives",
      country: "Maldives",
    },
    rating: 4.9,
    reviewsCount: 328,
    pricePerNight: 450,
    originalPrice: 550,
    amenities: [
      "Private Beach",
      "Infinity Pool",
      "Spa & Wellness",
      "Fine Dining",
      "Water Sports",
      "Free WiFi",
    ],
    featured: true,
    image: "Alya2.jpeg",
    distance: "2.3 km from airport",
  },
  {
    name: "Ocean Pearl Hotel",
    type: "Luxury Resort",
    location: {
      city: "Bali",
      country: "Indonesia",
    },
    rating: 4.8,
    reviewsCount: 456,
    pricePerNight: 380,
    originalPrice: 480,
    amenities: [
      "Ocean View",
      "Spa",
      "Pool",
      "Restaurant",
      "Bar",
      "Free Parking",
    ],
    featured: true,
    image: "Alya3.jpeg",
    distance: "5.1 km from city center",
  },
  {
    name: "Sunset Villa Resort",
    type: "Luxury Resort",
    location: {
      city: "Santorini",
      country: "Greece",
    },
    rating: 4.9,
    reviewsCount: 512,
    pricePerNight: 520,
    originalPrice: 650,
    amenities: [
      "Caldera View",
      "Private Pool",
      "Spa",
      "Fine Dining",
      "Concierge",
      "Free WiFi",
    ],
    featured: true,
    image: "Boa Hancock1.jpeg",
    distance: "1.8 km from Oia",
  },

  // Beach Hotels
  {
    name: "Tropical Breeze Hotel",
    type: "Beach Hotel",
    location: {
      city: "Phuket",
      country: "Thailand",
    },
    rating: 4.6,
    reviewsCount: 289,
    pricePerNight: 180,
    originalPrice: 240,
    amenities: [
      "Beach Access",
      "Pool",
      "Restaurant",
      "Bar",
      "Free WiFi",
      "Gym",
    ],
    featured: false,
    image: "Boa Hancock2.jpg",
    distance: "0.5 km from Patong Beach",
  },
  {
    name: "Coral Sands Resort",
    type: "Beach Hotel",
    location: {
      city: "Cancun",
      country: "Mexico",
    },
    rating: 4.7,
    reviewsCount: 367,
    pricePerNight: 220,
    originalPrice: 280,
    amenities: [
      "Private Beach",
      "Pool",
      "All-Inclusive",
      "Water Sports",
      "Spa",
      "Kids Club",
    ],
    featured: true,
    image: "Fubuki1.jpeg",
    distance: "12 km from airport",
  },

  // City Hotels
  {
    name: "Grand Metropolitan Hotel",
    type: "City Hotel",
    location: {
      city: "New York",
      country: "USA",
    },
    rating: 4.5,
    reviewsCount: 892,
    pricePerNight: 320,
    originalPrice: 420,
    amenities: [
      "Rooftop Bar",
      "Gym",
      "Business Center",
      "Restaurant",
      "Free WiFi",
      "Concierge",
    ],
    featured: true,
    image: "Fubuki2.jpg",
    distance: "0.8 km from Times Square",
  },
  {
    name: "Urban Loft Hotel",
    type: "City Hotel",
    location: {
      city: "Tokyo",
      country: "Japan",
    },
    rating: 4.6,
    reviewsCount: 445,
    pricePerNight: 280,
    originalPrice: 350,
    amenities: [
      "Modern Design",
      "Restaurant",
      "Bar",
      "Free WiFi",
      "Gym",
      "Laundry Service",
    ],
    featured: false,
    image: "Mei Mei1.jpg",
    distance: "0.3 km from Shibuya Station",
  },
  {
    name: "Skyline Plaza Hotel",
    type: "City Hotel",
    location: {
      city: "Dubai",
      country: "UAE",
    },
    rating: 4.8,
    reviewsCount: 678,
    pricePerNight: 400,
    originalPrice: 500,
    amenities: [
      "Sky Bar",
      "Infinity Pool",
      "Spa",
      "Fine Dining",
      "Valet Parking",
      "Butler Service",
    ],
    featured: true,
    image: "Mei Mei2.jpg",
    distance: "5 km from Burj Khalifa",
  },

  // Boutique Hotels
  {
    name: "Heritage House Hotel",
    type: "Boutique Hotel",
    location: {
      city: "Paris",
      country: "France",
    },
    rating: 4.7,
    reviewsCount: 234,
    pricePerNight: 290,
    originalPrice: 360,
    amenities: [
      "Historic Building",
      "Garden Terrace",
      "Restaurant",
      "Free WiFi",
      "Concierge",
      "Art Gallery",
    ],
    featured: false,
    image: "Nami1.jpeg",
    distance: "1.2 km from Eiffel Tower",
  },
  {
    name: "Artisan Inn",
    type: "Boutique Hotel",
    location: {
      city: "Barcelona",
      country: "Spain",
    },
    rating: 4.6,
    reviewsCount: 189,
    pricePerNight: 210,
    originalPrice: 270,
    amenities: [
      "Rooftop Terrace",
      "Local Cuisine",
      "Free WiFi",
      "Bikes Available",
      "Library",
      "Wine Cellar",
    ],
    featured: false,
    image: "Nami2.jpg",
    distance: "0.7 km from Gothic Quarter",
  },

  // Mountain Lodges
  {
    name: "Alpine Peak Lodge",
    type: "Mountain Lodge",
    location: {
      city: "Aspen",
      country: "USA",
    },
    rating: 4.8,
    reviewsCount: 312,
    pricePerNight: 340,
    originalPrice: 420,
    amenities: [
      "Ski-in/Ski-out",
      "Hot Tub",
      "Restaurant",
      "Fireplace Lounge",
      "Spa",
      "Equipment Rental",
    ],
    featured: true,
    image: "Ng1.jpg",
    distance: "0.2 km from slopes",
  },
  {
    name: "Mountain View Chalet",
    type: "Mountain Lodge",
    location: {
      city: "Zermatt",
      country: "Switzerland",
    },
    rating: 4.9,
    reviewsCount: 267,
    pricePerNight: 480,
    originalPrice: 600,
    amenities: [
      "Matterhorn View",
      "Wellness Center",
      "Fine Dining",
      "Ski Storage",
      "Sauna",
      "Concierge",
    ],
    featured: true,
    image: "Ng2.jpg",
    distance: "0.5 km from cable car",
  },

  // Budget Hotels
  {
    name: "Comfort Inn Express",
    type: "Budget Hotel",
    location: {
      city: "Los Angeles",
      country: "USA",
    },
    rating: 4.2,
    reviewsCount: 523,
    pricePerNight: 95,
    originalPrice: 120,
    amenities: [
      "Free Breakfast",
      "Free WiFi",
      "Parking",
      "24/7 Reception",
      "Vending Machines",
    ],
    featured: false,
    image: "Ng3.jpg",
    distance: "3 km from downtown",
  },
  {
    name: "City Stay Hotel",
    type: "Budget Hotel",
    location: {
      city: "London",
      country: "UK",
    },
    rating: 4.1,
    reviewsCount: 698,
    pricePerNight: 110,
    originalPrice: 145,
    amenities: [
      "Free WiFi",
      "Breakfast Available",
      "Luggage Storage",
      "Tour Desk",
      "Laundry",
    ],
    featured: false,
    image: "Ng4.jpg",
    distance: "1.5 km from tube station",
  },

  // Business Hotels
  {
    name: "Executive Business Hotel",
    type: "Business Hotel",
    location: {
      city: "Singapore",
      country: "Singapore",
    },
    rating: 4.7,
    reviewsCount: 412,
    pricePerNight: 260,
    originalPrice: 320,
    amenities: [
      "Business Center",
      "Meeting Rooms",
      "Executive Lounge",
      "Gym",
      "Restaurant",
      "Free WiFi",
    ],
    featured: false,
    image: "nicorobin1.jpg",
    distance: "2 km from financial district",
  },
  {
    name: "Corporate Suites Hotel",
    type: "Business Hotel",
    location: {
      city: "Frankfurt",
      country: "Germany",
    },
    rating: 4.5,
    reviewsCount: 356,
    pricePerNight: 230,
    originalPrice: 290,
    amenities: [
      "Conference Facilities",
      "Workspace in Rooms",
      "Restaurant",
      "Bar",
      "Gym",
      "Airport Shuttle",
    ],
    featured: false,
    image: "nicorobin2.jpg",
    distance: "8 km from airport",
  },

  // Eco Hotels
  {
    name: "Green Valley Eco Resort",
    type: "Eco Hotel",
    location: {
      city: "Costa Rica",
      country: "Costa Rica",
    },
    rating: 4.8,
    reviewsCount: 245,
    pricePerNight: 195,
    originalPrice: 250,
    amenities: [
      "Sustainable Building",
      "Organic Restaurant",
      "Nature Trails",
      "Solar Power",
      "Wildlife Tours",
      "Yoga Classes",
    ],
    featured: true,
    image: "Retsu Unohana1.jpg",
    distance: "15 km from national park",
  },
  {
    name: "Rainforest Lodge",
    type: "Eco Hotel",
    location: {
      city: "Amazon",
      country: "Brazil",
    },
    rating: 4.7,
    reviewsCount: 178,
    pricePerNight: 175,
    originalPrice: 230,
    amenities: [
      "Jungle Tours",
      "Organic Meals",
      "Bird Watching",
      "Eco-Friendly",
      "Canopy Walks",
      "Local Guides",
    ],
    featured: false,
    image: "Retsu Unohana2.jpg",
    distance: "45 km from Manaus",
  },

  // Desert Resorts
  {
    name: "Desert Oasis Resort",
    type: "Desert Resort",
    location: {
      city: "Marrakech",
      country: "Morocco",
    },
    rating: 4.6,
    reviewsCount: 289,
    pricePerNight: 210,
    originalPrice: 270,
    amenities: [
      "Desert Tours",
      "Traditional Spa",
      "Pool",
      "Moroccan Restaurant",
      "Camel Rides",
      "Stargazing",
    ],
    featured: true,
    image: "vivi1.jpg",
    distance: "25 km from city center",
  },

  {
    name: "Bijay Resort",
    type: "Desert Resort",
    location: {
      city: "Bhaktapur",
      country: "Nepal",
    },
    rating: 4.9,
    reviewsCount: 299,
    pricePerNight: 200,
    originalPrice: 300,
    amenities: [
      "Desert Tours",
      "Traditional Spa",
      "Pool",
      "Moroccan Restaurant",
      "Camel Rides",
      "Stargazing",
    ],
    featured: true,
    image: "vivi2.jpg",
    distance: "25 km from city center",
  },
];

// Source folder where your original images are stored
const SOURCE_IMAGE_DIR = path.join(process.cwd(), "uploads", "images");

// Destination base folder for categorized images
const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads", "images");

// Helper function to ensure a folder exists, create if missing
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
};

// Helper function to copy images and prepare hotel data
const prepareAndCopyImages = () => {
  ensureFolderExists(SOURCE_IMAGE_DIR); // Ensure source folder exists
  return sampleHotels.map((hotel) => {
    const typeFolderName = hotel.type.toLowerCase().replace(/\s+/g, "-");
    const destFolder = path.join(UPLOADS_BASE_DIR, typeFolderName);
    const sourceImagePath = path.join(SOURCE_IMAGE_DIR, hotel.image);
    const destImagePath = path.join(destFolder, hotel.image);

    // Ensure destination type folder exists
    ensureFolderExists(destFolder);

    // Copy the image file if it exists
    if (fs.existsSync(sourceImagePath)) {
      fs.copyFileSync(sourceImagePath, destImagePath);
      console.log(`✅ Copied image ${hotel.image} to ${destFolder}`);
    } else {
      console.warn(`⚠️ Source image not found: ${sourceImagePath}`);
    }

    // Return the hotel object with updated image path
    return {
      ...hotel,
      image: path.relative(process.cwd(), destImagePath).replace(/\\/g, "/"),
    };
  });
};

const preparedHotels = prepareAndCopyImages();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Hotels.deleteMany({});
    await Hotels.insertMany(preparedHotels);
    console.log("✅ Sample hotel data inserted successfully.");
    console.log(`📊 Total hotels inserted: ${preparedHotels.length}`);
    console.log(
      `🏨 Hotel Types: ${[
        ...new Set(sampleHotels.map((hotel) => hotel.type)),
      ].join(", ")}`
    );
    console.log(
      `🌍 Locations: ${[
        ...new Set(
          sampleHotels.map(
            (hotel) => `${hotel.location.city}, ${hotel.location.country}`
          )
        ),
      ].join(" | ")}`
    );
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error inserting sample data:", err);
    mongoose.disconnect();
  });
