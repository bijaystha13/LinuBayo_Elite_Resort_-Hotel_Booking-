"use client";

import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import styles from "./login.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
