import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ GOOGLE LOGIN ROUTE
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = {
      name: payload.name,
      email: payload.email,
    };

    // create JWT
    const appToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: appToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
});

export default router;
