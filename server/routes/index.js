import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import buildingRoutes from "./buldingRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);
router.use("/bulding", buildingRoutes);

export default router;
