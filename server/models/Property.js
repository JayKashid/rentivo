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


// import mongoose from "mongoose";

// const propertySchema = new mongoose.Schema(
//   {
//     // Step 1: User info
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Reference to User model if you have one
//       required: true,
//     },
//     userType: {
//       type: String,
//       enum: ["Owner", "Broker/Builder"],
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },

//     // Step 2: Property details
//     name: String,
//     city: String,
//     locality: String,
//     projectName: String,

//     propertyType: String, // Apartment, Villa, etc
//     bhk: String,
//     area: Number,
//     areaUnit: String,

//     furnishType: String,
//     amenities: [String],
//     shareWithAgents: Boolean,

//     // Step 3: Pricing
//     monthlyRent: Number,
//     securityDeposit: String,
//     availableFrom: Date,

//     // Media
//     photos: [String],
//     videos: [String],

//     // Status and Management
//     status: {
//       type: String,
//       enum: ["Active", "Under Review", "Rejected", "Deleted", "Expired"],
//       default: "Under Review",
//     },
    
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
    
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
    
//     // Admin fields
//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Admin who approved/rejected
//     },
    
//     deletedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Who deleted (user or admin)
//     },
    
//     deletionReason: String,
    
//     // Display fields for frontend
//     priceDisplay: String, // Formatted price like "₹ 15,000"
//     propertyTypeDisplay: String, // Formatted like "2 BHK Apartment"
//     areaDisplay: String, // Formatted like "950 sq. ft."
    
//     // Stats
//     views: {
//       type: Number,
//       default: 0,
//     },
    
//     enquiries: {
//       type: Number,
//       default: 0,
//     },
    
//     // For filtering
//     category: {
//       type: String,
//       enum: ["Rent", "Buy", "Commercial"],
//       default: "Rent",
//     },
    
//     // For admin dashboard
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
    
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
    
//     lastActivity: {
//       type: Date,
//       default: Date.now,
//     }
//   },
//   { timestamps: true }
// );

// // Update timestamps on save
// propertySchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// export default mongoose.model("Property", propertySchema);