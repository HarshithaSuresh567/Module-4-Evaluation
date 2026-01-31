import express from "express";

import {
    addVehicle,
    assignDriver,
    getVehicle
} from "../controllers/vehicle.controller.js";

import { rateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.post("/add", rateLimiter, addVehicle);
router.patch("/assign/:vehicleId", assignDriver);
router.get("/:vehicleId", getVehicle);

export default router;
