"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "../../components/Hotels/HeroSection";
import StatsSection from "../../components/Hotels/StatsSection";
import HotelsGrid from "../../components/Hotels/HotelsGrid";
import CTASection from "../../components/Hotels/CTASection";

const DestinationAsiaPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const router = useRouter();

  const destinations = [
    {
      id: 1,
      name: "Tokyo",
      country: "Japan",
      image: "🗼",
      rating: 4.9,
      reviews: 2540,
      hotels: 1250,
      price: "From $150/night",
      description:
        "Experience the perfect blend of ancient traditions and modern technology",
      highlights: ["Cherry Blossoms", "Temples", "Modern City", "Cuisine"],
      bestTime: "March - May, September - November",
    },
    {
      id: 2,
      name: "Bali",
      country: "Indonesia",
      image: "🏝️",
      rating: 4.8,
      reviews: 3120,
      hotels: 980,
      price: "From $80/night",
      description:
        "Tropical paradise with stunning beaches, temples, and rice terraces",
      highlights: ["Beaches", "Temples", "Rice Terraces", "Surf"],
      bestTime: "April - October",
    },
    {
      id: 3,
      name: "Bangkok",
      country: "Thailand",
      image: "🛕",
      rating: 4.7,
      reviews: 2890,
      hotels: 1450,
      price: "From $60/night",
      description:
        "Vibrant city with golden temples, street food, and bustling markets",
      highlights: ["Temples", "Street Food", "Markets", "Nightlife"],
      bestTime: "November - February",
    },
    {
      id: 4,
      name: "Singapore",
      country: "Singapore",
      image: "🏙️",
      rating: 4.9,
      reviews: 2150,
      hotels: 780,
      price: "From $180/night",
      description:
        "Modern city-state with futuristic architecture and diverse culture",
      highlights: ["Gardens", "Shopping", "Food", "Marina Bay"],
      bestTime: "February - April",
    },
    {
      id: 5,
      name: "Seoul",
      country: "South Korea",
      image: "🏯",
      rating: 4.8,
      reviews: 1960,
      hotels: 890,
      price: "From $120/night",
      description:
        "Dynamic capital blending traditional palaces with K-pop culture",
      highlights: ["Palaces", "K-Pop", "Shopping", "Food"],
      bestTime: "March - May, September - November",
    },
    {
      id: 6,
      name: "Maldives",
      country: "Maldives",
      image: "🏖️",
      rating: 5.0,
      reviews: 1540,
      hotels: 520,
      price: "From $350/night",
      description:
        "Luxury island paradise with crystal-clear waters and overwater villas",
      highlights: ["Beaches", "Diving", "Luxury", "Resorts"],
      bestTime: "November - April",
    },
    {
      id: 7,
      name: "Hong Kong",
      country: "China",
      image: "🌃",
      rating: 4.7,
      reviews: 2340,
      hotels: 1120,
      price: "From $140/night",
      description:
        "Skyline city with dim sum, shopping, and Victoria Harbour views",
      highlights: ["Skyline", "Dim Sum", "Shopping", "Harbour"],
      bestTime: "October - December",
    },
    {
      id: 8,
      name: "Hanoi",
      country: "Vietnam",
      image: "🏞️",
      rating: 4.6,
      reviews: 1780,
      hotels: 650,
      price: "From $50/night",
      description:
        "Historic city with French colonial charm and amazing street food",
      highlights: ["Old Quarter", "Street Food", "History", "Lakes"],
      bestTime: "September - November, March - April",
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    if (selectedCountry === "all") return true;
    return dest.country === selectedCountry;
  });

  const handleExplore = (country) => {
    // Store the selected country in localStorage for the hotels page to read
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", country);
    }
    // Navigate to your hotels/luxury page
    router.push("/hotels/luxury");
  };

  return (
    <div>
      <HeroSection />
      <StatsSection />
      <HotelsGrid
        destinations={filteredDestinations}
        onExplore={handleExplore}
      />
      <CTASection />
    </div>
  );
};

export default DestinationAsiaPage;
