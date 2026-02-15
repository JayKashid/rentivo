import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

export default router;

