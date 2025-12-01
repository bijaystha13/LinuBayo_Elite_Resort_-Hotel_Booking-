import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import HttpError from "../models/HttpError.js";

export async function signup(req, res, next) {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Users.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Signing in failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exits, please login instead",
      422
    );
    return next(error);
  }

  const role = email.endsWith("@admin.com") ? "admin" : "user";

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again later",
      500
    );
    return next(error);
  }

  const createdUser = new Users({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
      process.env.JWT_SECRET,

      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    role,
    token,
    message: "User Created",
  });
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Users.find({ email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Credentials not found, could not log you in. Please try signing up",
      403
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Invalid credentials, could not log you in please check your credentials and try againa.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET || "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    message: "Logged In",
    userId: existingUser.id,
    email: existingUser.email,
    token,
    role: existingUser.role,
  });
}
