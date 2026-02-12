// import Property from "../models/Property.js";

// // CREATE PROPERTY
// export const createProperty = async (req, res) => {
//   try {
//     const property = await Property.create(req.body);
//     res.status(201).json(property);
//   } catch (error) {
//     res.status(400).json({
//       message: "Failed to create property",
//       error: error.message,
//     });
//   }
// };

// // GET ALL PROPERTIES
// export const getAllProperties = async (req, res) => {
//   const properties = await Property.find().sort({ createdAt: -1 });
//   res.json(properties);
// };

// // GET SINGLE PROPERTY
// export const getPropertyById = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     res.json(property);
//   } catch {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// };

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
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// GET SINGLE PROPERTY
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

// GET PROPERTIES BY USER (for "Your Posts")
export const getPropertiesByUser = async (req, res) => {
  try {
    // Assuming you have user authentication and store user ID in property
    const { userId } = req.params;
    
    const properties = await Property.find({ userId }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user properties",
      error: error.message,
    });
  }
};