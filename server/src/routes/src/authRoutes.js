import express from "express";
import {
  signup,
  verifyEmail,
  sendOTP,
  login,
  logout,
} from "../../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

export default router;
