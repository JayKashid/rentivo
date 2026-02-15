import Property from "../models/Property.js";

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// GET ALL PROPERTIES
export const getAllProperties = async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json(properties);
};

// GET SINGLE PROPERTY
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

