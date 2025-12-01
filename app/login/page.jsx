"use client";

import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import styles from "./login.module.css";
import Modal from "../shared/UIElements/Modal";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

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
      if (res.ok) {
        console.log("Login success:", data);
        showModal("Welcome Back!", "Login successful", "success");
      } else {
        showModal(
          "Login Failed",
          data.message || "Invalid credentials",
          "error"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      showModal("Connection Error", "Unable to connect to server", "error");
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
      if (res.ok) {
        console.log("Signup success:", data);
        showModal("Account Created!", "Signup successful", "success");
      } else {
        showModal(
          "Signup Failed",
          data.message || "Unable to create account",
          "error"
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      showModal("Connection Error", "Unable to connect to server", "error");
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
