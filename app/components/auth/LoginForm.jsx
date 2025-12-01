"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SocialButton from "./SocialButton";

import useForm from "@/app/shared/hooks/useFormHook";
import styles from "@/app/login/login.module.css";

const LoginForm = () => {
  const [loginStep, setLoginStep] = useState(1);

  const loginForm = useForm(
    { email: "", password: "", rememberMe: false },
    (values) => console.log("Login submitted:", values)
  );

  const handleLoginContinue = () => {
    if (loginForm.values.email && !loginForm.errors.email) setLoginStep(2);
    else loginForm.setErrors({ email: "Please enter a valid email" });
  };

  return (
    <div className={styles.authForm}>
      {loginStep === 1 ? (
        <>
          <div className={styles.welcomeText}>
            <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
            <p className={styles.welcomeDescription}>
              Sign in to access your bookings and exclusive deals
            </p>
          </div>

          <TextInput
            label="Email Address"
            icon={Mail}
            type="email"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.touched.email && loginForm.errors.email}
            placeholder="Enter your email"
          />

          <button onClick={handleLoginContinue} className={styles.submitButton}>
            Continue
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>Or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <SocialButton icon="G">Google</SocialButton>
            <SocialButton icon="f">Facebook</SocialButton>
          </div>
        </>
      ) : (
        <>
          <div className={styles.welcomeText}>
            <h2 className={styles.welcomeTitle}>Enter Password</h2>
            <p className={styles.welcomeDescription}>
              Signing in as <strong>{loginForm.values.email}</strong>
            </p>
          </div>

          <PasswordInput
            label="Password"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.touched.password && loginForm.errors.password}
            placeholder="Enter your password"
          />

          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                className={styles.checkbox}
                checked={loginForm.values.rememberMe}
                onChange={loginForm.handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setLoginStep(1)}
              className={styles.backButton}
            >
              Back
            </button>
            <button
              onClick={loginForm.handleSubmit}
              className={styles.submitButton}
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
