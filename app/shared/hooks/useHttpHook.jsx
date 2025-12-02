import { useState, useCallback } from "react";

// API Base URL - just the base without /hotels
const API_BASE_URL = "http://localhost:5002/api";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const config = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };

        if (body) {
          config.body = JSON.stringify(body);
        }

        // Build the full URL properly
        const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

        console.log("Fetching from:", fullUrl); // Debug log

        const response = await fetch(fullUrl, config);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        setIsLoading(false);
        return data;
      } catch (err) {
        setIsLoading(false);
        const errorMessage = err.message || "Something went wrong!";
        setError(errorMessage);
        console.error("Fetch error:", err); // Debug log
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
