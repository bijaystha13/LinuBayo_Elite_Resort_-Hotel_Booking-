import express from "express";

import { getAllHotels } from "../controllers/hotels-controllers.js";

const router = express.Router();

router.get("/", getAllHotels);

export default router;
