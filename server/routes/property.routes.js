import express from "express";
import upload from "../middleware/upload.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

// ✅ MUST use multer here
router.post(
  "/",
  upload.array("photos", 10), // field name must match FormData
  createProperty
);

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.delete("/:id", deleteProperty);

export default router;
