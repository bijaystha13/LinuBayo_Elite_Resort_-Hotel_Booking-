import { useState, useEffect } from "react";
import { useHttp } from "@/app/shared/hooks/useHttpHook";

export const useHotelData = (id) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const data = await sendRequest(`/hotels/${id}`);
        if (data.success) {
          setHotel(data.data);
        }
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, sendRequest]);

  return { hotel, isLoading, error };
};
