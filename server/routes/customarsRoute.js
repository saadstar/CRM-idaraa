import express from "express";
import { protectRoute } from "../middlewares/authMiddlewave.js";
import {
    createCustomar,
    getCustomars,
    updateCustomar,
    trashCustomar
} from "../controllers/costomarController.js";

const router = express.Router();

router.post("/create",protectRoute, createCustomar);

router.get("/", protectRoute, getCustomars);
router.put("/update/:id",protectRoute,  updateCustomar);
router.put("/:id",protectRoute,  trashCustomar);

export default router;
