import express from "express";
import {
  createSubTask,
  createBulding,
  postBuldingActivity,
  getBuldings,
  getBulding,
  updateBulding,
  trashBulding,
  uploadPriceOffer,
} from "../controllers/buldingController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import uploadPDFMiddleware from "../middlewares/uploadPDFMidleware.js";
import uploadImageMiddleware from "../middlewares/upoloadMidleware.js";

const router = express.Router();

router.post(
  "/create",
  protectRoute,
  isAdminRoute,
  uploadImageMiddleware,
  createBulding
);
router.post("/activity/:id", protectRoute, postBuldingActivity);

router.get("/", protectRoute, getBuldings);
router.get("/:id", protectRoute, getBulding);

router.put("/create-subtask/:id", protectRoute, createSubTask);
router.put("/update/:id", protectRoute,  updateBulding); 
router.put("/update-price-offer/:id", protectRoute, uploadPDFMiddleware.single("priceOffer"), uploadPriceOffer);
router.put("/:id", protectRoute, trashBulding);

export default router;
