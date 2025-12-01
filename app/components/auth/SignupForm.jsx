"use client";

import React from "react";
import { Mail, User, Lock } from "lucide-react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import CheckboxInput from "./CheckboxInput";
import SocialButton from "./SocialButton";
import useForm from "@/app/shared/hooks/useFormHook";
import styles from "@/app/login/login.module.css";

const validateSignup = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Full name is required";
  if (!values.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = "Please enter a valid email";
  if (!values.password) errors.password = "Password is required";
  if (!values.terms) errors.terms = "You must accept the terms";
  return errors;
};

const SignupForm = ({ onSubmit }) => {
  const signupForm = useForm(
    { name: "", email: "", password: "", terms: false },
    onSubmit,
    validateSignup
  );

  return (
    <div className={styles.authForm}>
      <div className={styles.welcomeText}>
        <h2 className={styles.welcomeTitle}>Create Account</h2>
        <p className={styles.welcomeDescription}>
          Sign up to start booking hotels and get exclusive deals
        </p>
      </div>

      <TextInput
        label="Full Name"
        icon={User}
        type="text"
        name="name"
        value={signupForm.values.name}
        onChange={signupForm.handleChange}
        onBlur={signupForm.handleBlur}
        error={signupForm.touched.name && signupForm.errors.name}
        placeholder="Enter your full name"
      />

      <TextInput
        label="Email Address"
        icon={Mail}
        type="email"
        name="email"
        value={signupForm.values.email}
        onChange={signupForm.handleChange}
        onBlur={signupForm.handleBlur}
        error={signupForm.touched.email && signupForm.errors.email}
        placeholder="Enter your email"
      />

      <PasswordInput
        label="Password"
        name="password"
        value={signupForm.values.password}
        onChange={signupForm.handleChange}
        onBlur={signupForm.handleBlur}
        error={signupForm.touched.password && signupForm.errors.password}
        placeholder="Enter a secure password"
      />

      <CheckboxInput
        label={
          <>
            I agree to the{" "}
            <a href="/terms" className={styles.link}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className={styles.link}>
              Privacy Policy
            </a>
          </>
        }
        name="terms"
        checked={signupForm.values.terms}
        onChange={signupForm.handleChange}
        error={signupForm.errors.terms}
      />

      <button
        type="button"
        onClick={signupForm.handleSubmit}
        className={styles.submitButton}
      >
        Sign Up
      </button>

      <div className={styles.divider}>
        <span className={styles.dividerText}>Or continue with</span>
      </div>

      <div className={styles.socialButtons}>
        <SocialButton icon="G">Google</SocialButton>
        <SocialButton icon="f">Facebook</SocialButton>
      </div>
    </div>
  );
};

export default SignupForm;
