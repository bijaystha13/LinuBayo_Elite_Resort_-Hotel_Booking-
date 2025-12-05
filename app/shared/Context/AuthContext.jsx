"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// Create the AuthContext
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-logout timer (30 minutes of inactivity)
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
  const inactivityTimerRef = useRef(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const loginTime = localStorage.getItem("loginTime");

    if (storedUser && loginTime) {
      const parsedUser = JSON.parse(storedUser);
      const timeElapsed = Date.now() - parseInt(loginTime);

      // Check if session is still valid (less than 24 hours)
      if (timeElapsed < 24 * 60 * 60 * 1000) {
        setUser(parsedUser);
      } else {
        // Session expired
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Setup inactivity timer
  useEffect(() => {
    if (user) {
      resetInactivityTimer();

      // Activity event listeners
      const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
      events.forEach((event) => {
        window.addEventListener(event, resetInactivityTimer);
      });

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        events.forEach((event) => {
          window.removeEventListener(event, resetInactivityTimer);
        });
      };
    }
  }, [user]);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      logout();
      alert("You have been logged out due to inactivity.");
    }, INACTIVITY_TIMEOUT);
  };

  // Login function - works with or without backend
  const login = (emailOrUserData, password = null, role = "user") => {
    let userData;

    // Check if first parameter is already a user object (from backend)
    if (typeof emailOrUserData === "object" && emailOrUserData !== null) {
      userData = {
        id: emailOrUserData.id,
        email: emailOrUserData.email,
        name: emailOrUserData.name,
        role: emailOrUserData.role,
      };
    } else {
      // Simple login without backend
      userData = {
        email: emailOrUserData,
        role: role,
        name: emailOrUserData.split("@")[0],
        id: Date.now().toString(),
      };
    }

    console.log("Setting user in context:", userData); // Debug log
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("token"); // Also remove token if exists
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
