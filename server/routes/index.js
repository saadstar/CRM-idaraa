import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import buildingRoutes from "./buldingRoutes.js";
import customarRoutes from "./customarsRoute.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);
router.use("/bulding", buildingRoutes);
router.use("/customar", customarRoutes);

export default router;
