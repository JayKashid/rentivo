import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProperty,
  getAllProperties,
  getUserProperties,
  getPropertyById,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

// ✅ MUST use multer here
router.post(
  "/",
  protect,
  upload.array("photos", 10), // field name must match FormData
  createProperty
);

router.get("/", getAllProperties); // Public route for all properties
router.get("/my-properties", protect, getUserProperties); // Protected route for user's properties
router.get("/:id", getPropertyById); // Keep public for now
router.delete("/:id", protect, deleteProperty);

export default router;
