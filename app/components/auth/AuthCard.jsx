"use client";
import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import styles from "@/app/login/login.module.css";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.authCard}>
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
          Signup
        </button>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthCard;
