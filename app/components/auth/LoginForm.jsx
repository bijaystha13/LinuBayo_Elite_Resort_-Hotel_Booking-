// "use client";

// import React, { useState } from "react";
// import { Mail } from "lucide-react";
// import TextInput from "./TextInput";
// import PasswordInput from "./PasswordInput";
// import SocialButton from "./SocialButton";
// import useForm from "@/app/shared/hooks/useFormHook";
// import styles from "@/app/login/login.module.css";

// const validateLogin = (values) => {
//   const errors = {};
//   if (!values.email) {
//     errors.email = "Email is required";
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
//     errors.email = "Please enter a valid email";
//   }

//   if (!values.password) {
//     errors.password = "Password is required";
//   } else if (values.password.length < 6) {
//     errors.password = "Password must be at least 6 characters";
//   }

//   return errors;
// };

// const LoginForm = ({ onSubmit }) => {
//   const [loginStep, setLoginStep] = useState(1);

//   const loginForm = useForm(
//     { email: "", password: "", rememberMe: false },
//     onSubmit,
//     validateLogin
//   );

//   //   const handleLoginContinue = () => {
//   //     // Validate only email
//   //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   //     if (!loginForm.values.email) {
//   //       loginForm.setErrors({ email: "Email is required" });
//   //       return;
//   //     }

//   //     if (!emailRegex.test(loginForm.values.email)) {
//   //       loginForm.setErrors({ email: "Please enter a valid email" });
//   //       return;
//   //     }

//   //     // Clear errors and move to next step
//   //     loginForm.setErrors({});
//   //     setLoginStep(2);
//   //   };

//   const handleLoginContinue = () => {
//     const email = loginForm.values.email;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Mark email touched so error displays
//     loginForm.handleBlur({ target: { name: "email" } });

//     if (!email) {
//       loginForm.setErrors({ email: "Email is required" });
//       return;
//     }

//     if (!emailRegex.test(email)) {
//       loginForm.setErrors({ email: "Please enter a valid email" });
//       return;
//     }

//     loginForm.setErrors({});
//     setLoginStep(2);
//   };

//   return (
//     <div className={styles.authForm}>
//       {loginStep === 1 ? (
//         <>
//           <div className={styles.welcomeText}>
//             <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
//             <p className={styles.welcomeDescription}>
//               Sign in to access your bookings and exclusive deals
//             </p>
//           </div>

//           <TextInput
//             label="Email Address"
//             icon={Mail}
//             type="email"
//             name="email"
//             value={loginForm.values.email}
//             onChange={loginForm.handleChange}
//             onBlur={loginForm.handleBlur}
//             error={loginForm.touched.email && loginForm.errors.email}
//             placeholder="Enter your email"
//             autoComplete="email"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleLoginContinue();
//               }
//             }}
//           />

//           <button
//             type="button"
//             onClick={handleLoginContinue}
//             className={styles.submitButton}
//           >
//             Continue
//           </button>

//           <div className={styles.divider}>
//             <span className={styles.dividerText}>Or continue with</span>
//           </div>

//           <div className={styles.socialButtons}>
//             <SocialButton icon="G">Google</SocialButton>
//             <SocialButton icon="f">Facebook</SocialButton>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className={styles.welcomeText}>
//             <h2 className={styles.welcomeTitle}>Enter Password</h2>
//             <p className={styles.welcomeDescription}>
//               Signing in as <strong>{loginForm.values.email}</strong>
//             </p>
//           </div>

//           <PasswordInput
//             label="Password"
//             name="password"
//             value={loginForm.values.password}
//             onChange={loginForm.handleChange}
//             onBlur={loginForm.handleBlur}
//             error={loginForm.touched.password && loginForm.errors.password}
//             placeholder="Enter your password"
//             autoComplete="current-password"
//           />

//           <div className={styles.formOptions}>
//             <label className={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 className={styles.checkbox}
//                 checked={loginForm.values.rememberMe}
//                 onChange={loginForm.handleChange}
//               />
//               <span>Remember me</span>
//             </label>
//             <a href="/forgot-password" className={styles.forgotLink}>
//               Forgot Password?
//             </a>
//           </div>

//           <div className={styles.buttonGroup}>
//             <button
//               type="button"
//               onClick={() => setLoginStep(1)}
//               className={styles.backButton}
//             >
//               Back
//             </button>
//             <button
//               type="button"
//               onClick={loginForm.handleSubmit}
//               className={styles.submitButton}
//             >
//               Sign In
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LoginForm;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail } from "lucide-react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SocialButton from "./SocialButton";
import useForm from "@/app/shared/hooks/useFormHook";
import styles from "@/app/login/login.module.css";

const validateLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const LoginForm = ({ onSubmit }) => {
  const [loginStep, setLoginStep] = useState(1);
  const passwordInputRef = useRef(null);

  const loginForm = useForm(
    { email: "", password: "", rememberMe: false },
    onSubmit,
    validateLogin
  );

  // Auto-focus password input when step changes to 2
  useEffect(() => {
    if (loginStep === 2 && passwordInputRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    }
  }, [loginStep]);

  const handleLoginContinue = () => {
    const email = loginForm.values.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Mark email touched so error displays
    loginForm.handleBlur({ target: { name: "email" } });

    if (!email) {
      loginForm.setErrors({ email: "Email is required" });
      return;
    }

    if (!emailRegex.test(email)) {
      loginForm.setErrors({ email: "Please enter a valid email" });
      return;
    }

    loginForm.setErrors({});
    setLoginStep(2);
  };

  const handlePasswordSubmit = () => {
    // Validate password before submitting
    const password = loginForm.values.password;

    loginForm.handleBlur({ target: { name: "password" } });

    if (!password) {
      loginForm.setErrors({ password: "Password is required" });
      return;
    }

    if (password.length < 6) {
      loginForm.setErrors({
        password: "Password must be at least 6 characters",
      });
      return;
    }

    // Submit the form
    loginForm.handleSubmit();
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
            autoComplete="email"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLoginContinue();
              }
            }}
          />

          <button
            type="button"
            onClick={handleLoginContinue}
            className={styles.submitButton}
          >
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
            ref={passwordInputRef}
            label="Password"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.touched.password && loginForm.errors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handlePasswordSubmit();
              }
            }}
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
              type="button"
              onClick={() => setLoginStep(1)}
              className={styles.backButton}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handlePasswordSubmit}
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
