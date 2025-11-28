"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Phone, Calendar } from "lucide-react";
import styles from "./login.module.css";
import useForm from "../shared/hooks/useFormHook";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1 = email, 2 = password
  const [signupStep, setSignupStep] = useState(1); // 1 = basic info, 2 = password

  // Login Form Hook
  const loginForm = useForm(
    {
      email: "",
      password: "",
      rememberMe: false,
    },
    (values) => {
      console.log("Login submitted:", values);
      // Handle login logic here
    }
  );

  // Signup Form Hook
  const signupForm = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    (values) => {
      console.log("Signup submitted:", values);
      // Handle signup logic here
    }
  );

  const handleTabSwitch = (isLoginTab) => {
    setIsLogin(isLoginTab);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setLoginStep(1);
    setSignupStep(1);
    // Reset forms when switching tabs
    loginForm.resetForm();
    signupForm.resetForm();
  };

  const handleLoginContinue = () => {
    if (loginForm.values.email && !loginForm.errors.email) {
      setLoginStep(2);
    } else {
      loginForm.setErrors({ email: "Please enter a valid email" });
    }
  };

  const handleSignupContinue = () => {
    const { firstName, lastName, email, phone, dateOfBirth } =
      signupForm.values;
    if (firstName && lastName && email && phone && dateOfBirth) {
      setSignupStep(2);
    } else {
      signupForm.handleSubmit({ preventDefault: () => {} });
    }
  };

  const handleBackToEmail = () => {
    setLoginStep(1);
  };

  const handleBackToInfo = () => {
    setSignupStep(1);
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
          <div className={styles.authHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>🏨</div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>HotelBook</span>
                <span className={styles.logoTagline}>Your Perfect Stay</span>
              </div>
            </div>
          </div>

          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${isLogin ? styles.active : ""}`}
              onClick={() => handleTabSwitch(true)}
            >
              Sign In
            </button>
            <button
              className={`${styles.tabButton} ${!isLogin ? styles.active : ""}`}
              onClick={() => handleTabSwitch(false)}
            >
              Sign Up
            </button>
            <div
              className={`${styles.tabIndicator} ${
                !isLogin ? styles.right : ""
              }`}
            ></div>
          </div>

          {isLogin ? (
            <div className={styles.authForm}>
              {loginStep === 1 ? (
                <>
                  <div className={styles.welcomeText}>
                    <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
                    <p className={styles.welcomeDescription}>
                      Sign in to access your bookings and exclusive deals
                    </p>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <div className={styles.inputWrapper}>
                      <Mail className={styles.inputIcon} />
                      <input
                        type="email"
                        name="email"
                        className={`${styles.formInput} ${
                          loginForm.touched.email && loginForm.errors.email
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Enter your email"
                        value={loginForm.values.email}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleLoginContinue()
                        }
                        autoFocus
                      />
                    </div>
                    {loginForm.touched.email && loginForm.errors.email && (
                      <span className={styles.errorText}>
                        {loginForm.errors.email}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleLoginContinue}
                    className={styles.submitButton}
                  >
                    Continue
                  </button>

                  <div className={styles.divider}>
                    <span className={styles.dividerText}>Or continue with</span>
                  </div>

                  <div className={styles.socialButtons}>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>G</span>
                      Google
                    </button>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>f</span>
                      Facebook
                    </button>
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

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <div className={styles.inputWrapper}>
                      <Lock className={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`${styles.formInput} ${
                          loginForm.touched.password &&
                          loginForm.errors.password
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Enter your password"
                        value={loginForm.values.password}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        autoFocus
                      />
                      <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className={styles.eyeIcon} />
                        ) : (
                          <Eye className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                    {loginForm.touched.password &&
                      loginForm.errors.password && (
                        <span className={styles.errorText}>
                          {loginForm.errors.password}
                        </span>
                      )}
                  </div>

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
                      onClick={handleBackToEmail}
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
          ) : (
            <div className={styles.authForm}>
              {signupStep === 1 ? (
                <>
                  <div className={styles.welcomeText}>
                    <h2 className={styles.welcomeTitle}>Create Account</h2>
                    <p className={styles.welcomeDescription}>
                      Join us and start booking amazing hotels worldwide
                    </p>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First Name</label>
                      <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} />
                        <input
                          type="text"
                          name="firstName"
                          className={`${styles.formInput} ${
                            signupForm.touched.firstName &&
                            signupForm.errors.firstName
                              ? styles.inputError
                              : ""
                          }`}
                          placeholder="First name"
                          value={signupForm.values.firstName}
                          onChange={signupForm.handleChange}
                          onBlur={signupForm.handleBlur}
                        />
                      </div>
                      {signupForm.touched.firstName &&
                        signupForm.errors.firstName && (
                          <span className={styles.errorText}>
                            {signupForm.errors.firstName}
                          </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last Name</label>
                      <div className={styles.inputWrapper}>
                        <User className={styles.inputIcon} />
                        <input
                          type="text"
                          name="lastName"
                          className={`${styles.formInput} ${
                            signupForm.touched.lastName &&
                            signupForm.errors.lastName
                              ? styles.inputError
                              : ""
                          }`}
                          placeholder="Last name"
                          value={signupForm.values.lastName}
                          onChange={signupForm.handleChange}
                          onBlur={signupForm.handleBlur}
                        />
                      </div>
                      {signupForm.touched.lastName &&
                        signupForm.errors.lastName && (
                          <span className={styles.errorText}>
                            {signupForm.errors.lastName}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <div className={styles.inputWrapper}>
                      <Mail className={styles.inputIcon} />
                      <input
                        type="email"
                        name="email"
                        className={`${styles.formInput} ${
                          signupForm.touched.email && signupForm.errors.email
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Enter your email"
                        value={signupForm.values.email}
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                      />
                    </div>
                    {signupForm.touched.email && signupForm.errors.email && (
                      <span className={styles.errorText}>
                        {signupForm.errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <div className={styles.inputWrapper}>
                      <Phone className={styles.inputIcon} />
                      <input
                        type="tel"
                        name="phone"
                        className={`${styles.formInput} ${
                          signupForm.touched.phone && signupForm.errors.phone
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Enter your phone number"
                        value={signupForm.values.phone}
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                      />
                    </div>
                    {signupForm.touched.phone && signupForm.errors.phone && (
                      <span className={styles.errorText}>
                        {signupForm.errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Date of Birth</label>
                    <div className={styles.inputWrapper}>
                      <Calendar className={styles.inputIcon} />
                      <input
                        type="date"
                        name="dateOfBirth"
                        className={`${styles.formInput} ${
                          signupForm.touched.dateOfBirth &&
                          signupForm.errors.dateOfBirth
                            ? styles.inputError
                            : ""
                        }`}
                        value={signupForm.values.dateOfBirth}
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                      />
                    </div>
                    {signupForm.touched.dateOfBirth &&
                      signupForm.errors.dateOfBirth && (
                        <span className={styles.errorText}>
                          {signupForm.errors.dateOfBirth}
                        </span>
                      )}
                  </div>

                  <button
                    onClick={handleSignupContinue}
                    className={styles.submitButton}
                  >
                    Continue
                  </button>

                  <div className={styles.divider}>
                    <span className={styles.dividerText}>Or sign up with</span>
                  </div>

                  <div className={styles.socialButtons}>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>G</span>
                      Google
                    </button>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>f</span>
                      Facebook
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.welcomeText}>
                    <h2 className={styles.welcomeTitle}>Set Password</h2>
                    <p className={styles.welcomeDescription}>
                      Create a secure password for your account
                    </p>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <div className={styles.inputWrapper}>
                      <Lock className={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`${styles.formInput} ${
                          signupForm.touched.password &&
                          signupForm.errors.password
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Create a password"
                        value={signupForm.values.password}
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                        autoFocus
                      />
                      <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className={styles.eyeIcon} />
                        ) : (
                          <Eye className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                    {signupForm.touched.password &&
                      signupForm.errors.password && (
                        <span className={styles.errorText}>
                          {signupForm.errors.password}
                        </span>
                      )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Confirm Password</label>
                    <div className={styles.inputWrapper}>
                      <Lock className={styles.inputIcon} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`${styles.formInput} ${
                          signupForm.touched.confirmPassword &&
                          signupForm.errors.confirmPassword
                            ? styles.inputError
                            : ""
                        }`}
                        placeholder="Confirm your password"
                        value={signupForm.values.confirmPassword}
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                      />
                      <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className={styles.eyeIcon} />
                        ) : (
                          <Eye className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                    {signupForm.touched.confirmPassword &&
                      signupForm.errors.confirmPassword && (
                        <span className={styles.errorText}>
                          {signupForm.errors.confirmPassword}
                        </span>
                      )}
                  </div>

                  <div className={styles.termsContainer}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        className={styles.checkbox}
                        checked={signupForm.values.agreeToTerms}
                        onChange={signupForm.handleChange}
                      />
                      <span>
                        I agree to the{" "}
                        <a href="/terms" className={styles.link}>
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className={styles.link}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {signupForm.touched.agreeToTerms &&
                      signupForm.errors.agreeToTerms && (
                        <span className={styles.errorText}>
                          {signupForm.errors.agreeToTerms}
                        </span>
                      )}
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      onClick={handleBackToInfo}
                      className={styles.backButton}
                    >
                      Back
                    </button>
                    <button
                      onClick={signupForm.handleSubmit}
                      className={styles.submitButton}
                    >
                      Create Account
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className={styles.authFooter}>
            <p className={styles.footerText}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className={styles.switchButton}
                onClick={() => handleTabSwitch(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
