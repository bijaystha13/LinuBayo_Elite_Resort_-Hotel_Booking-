import dotenv from "dotenv";
import bodyParser from "body-parser";

import express from "express";
import mongoose from "mongoose";
import path from "path";
import usersRoutes from "./routes/users-routes.js";
import hotelRoutes from "./routes/hotes-routes.js";
import HttpError from "./models/HttpError.js";

dotenv.config();
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/users/", usersRoutes);
app.use("/api/hotels/", hotelRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5002);
    console.log("Connected To Database, server running on port 5002");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
