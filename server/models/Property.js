import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // Step 1: User info
    userType: {
      type: String,
      enum: ["Owner", "Broker/Builder"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Step 2: Property details
    name: String,
    city: String,
    locality: String,
    projectName: String,

    propertyType: String, // Apartment, Villa, etc
    bhk: String,
    area: Number,
    areaUnit: String,

    furnishType: String,
    amenities: [String],
    shareWithAgents: Boolean,

    // Step 3: Pricing
    monthlyRent: Number,
    securityDeposit: String,
    availableFrom: Date,

    // Media
    photos: [String],   // URLs (later Cloudinary/S3)
    videos: [String],

    // Meta
    status: {
      type: String,
      default: "Active",
    },
      category: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    purpose: {
      type: String,
      enum: ["Rent", "Sell", "PG"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);


