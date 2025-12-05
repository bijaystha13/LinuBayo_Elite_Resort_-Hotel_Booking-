import { useState } from "react";

export const useImageGallery = (imagesLength) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  const setImageIndex = (index) => {
    setCurrentImageIndex(index);
  };

  return {
    currentImageIndex,
    handlePrevImage,
    handleNextImage,
    setImageIndex,
  };
};
