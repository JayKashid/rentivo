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

// import express from "express";
// import {
//   createProperty,
//   getAllProperties,
//   getPropertyById,
//   updateProperty,
//   deleteProperty,
//   getPropertiesByUser
// } from "../controllers/property.controller.js";

// const router = express.Router();

// router.post("/", createProperty);
// router.get("/", getAllProperties);
// router.get("/user/:userId", getPropertiesByUser);
// router.get("/:id", getPropertyById);
// router.put("/:id", updateProperty);
// router.delete("/:id", deleteProperty);

// export default router;