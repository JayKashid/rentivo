import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config(); // ensure env vars are loaded

// console.log("CLOUD_NAME from env:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API_KEY from env:", process.env.CLOUDINARY_API_KEY);
// console.log("API_SECRET from env:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Not set");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;