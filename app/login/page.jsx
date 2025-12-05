"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import styles from "./login.module.css";
import Modal from "../shared/UIElements/Modal";
import { useAuth } from "@/app/shared/Context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const router = useRouter();
  const { login } = useAuth();

  const showModal = (title, message, type = "error") => {
    setModalState({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogin = async (values) => {
    try {
      const res = await fetch("http://localhost:5002/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("Backend response:", data); // Debug log

      if (res.ok) {
        // Store token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Prepare user data from backend response
        const userData = {
          id: data.user?.id || data.userId,
          email: data.user?.email || values.email,
          name: data.user?.name || values.email.split("@")[0],
          role: data.user?.role || "user",
        };

        console.log("User data to store:", userData); // Debug log

        // Update auth context
        login(userData);

        showModal("Welcome Back!", "Login successful", "success");

        // Redirect based on role after modal shows
        setTimeout(() => {
          closeModal();
          if (userData.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/");
          }
        }, 1500);
      } else {
        showModal(
          "Login Failed",
          data.message ||
            "Invalid credentials. Please check your email and password.",
          "error"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      showModal(
        "Connection Error",
        "Unable to connect to server. Please check if the backend is running.",
        "error"
      );
    }
  };

  const handleSignup = async (values) => {
    try {
      const res = await fetch("http://localhost:5002/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("Signup response:", data); // Debug log

      if (res.ok) {
        // Store token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Prepare user data
        const userData = {
          id: data.user?.id || data.userId,
          email: data.user?.email || values.email,
          name: data.user?.name || values.name || values.email.split("@")[0],
          role: data.user?.role || "user",
        };

        console.log("Signup user data:", userData); // Debug log

        // Update auth context
        login(userData);

        showModal(
          "Account Created!",
          "Signup successful! Redirecting to home...",
          "success"
        );

        // Redirect to home
        setTimeout(() => {
          closeModal();
          router.push("/");
        }, 1500);
      } else {
        showModal(
          "Signup Failed",
          data.message || "Unable to create account. Please try again.",
          "error"
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      showModal(
        "Connection Error",
        "Unable to connect to server. Please check if the backend is running.",
        "error"
      );
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          {/* Tabs */}
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${isLogin ? styles.active : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`${styles.tabButton} ${!isLogin ? styles.active : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <div
              className={`${styles.tabIndicator} ${
                !isLogin ? styles.right : ""
              }`}
            ></div>
          </div>

          {/* Form */}
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <SignupForm onSubmit={handleSignup} />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
};

export default AuthPage;
