import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/property.routes.js";
import authRoutes from "./routes/auth.routes.js"; // ✅ ADD THIS

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoutes); // ✅ ADD THIS
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.send("Rentivo API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
