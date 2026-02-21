import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    // console.log("📦 req.body keys:", Object.keys(req.body));
    // console.log("📸 req.files:", req.files?.length || 0);

    const photoUrls = req.files?.map(file => file.path) || [];

    // Parse amenities if it's a string
    if (req.body.amenities && typeof req.body.amenities === 'string') {
      try {
        req.body.amenities = JSON.parse(req.body.amenities);
      } catch (e) {
        req.body.amenities = req.body.amenities.split(',').map(a => a.trim());
      }
    }

    const propertyData = {
      userType: req.body.userType || "Owner",
      phone: req.body.phone,
      category: req.body.category || "Residential",
      purpose: req.body.purpose || "Rent",
      name: req.body.name || "Unnamed Property",
      city: req.body.city || "Unknown City",
      locality: req.body.locality || "Unknown Locality",
      propertyType: req.body.propertyType || "Apartment",
      bhk: req.body.bhk || "2",
      area: parseInt(req.body.area) || 0,
      areaUnit: req.body.areaUnit || "sqft",
      furnishType: req.body.furnishType || "Fully Furnished",
      amenities: req.body.amenities || [],
      shareWithAgents: req.body.shareWithAgents === 'true',
      monthlyRent: parseInt(req.body.monthlyRent) || 0,
      securityDeposit: req.body.customDeposit || req.body.securityDeposit || "2 month",
      availableFrom: req.body.availableFrom || new Date(),
      photos: photoUrls,
      videos: [],
      status: "Under Review",
      isActive: false,
    };

    // console.log("🏗️ Creating property with:", propertyData);
    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    console.error("❌ Full error:", error);
    res.status(500).json({
      message: "Failed to create property",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};