import express from "express";
import {
  signup,
  verifyEmail,
  login,
  adminLogin,
} from "../../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/adminLogin", adminLogin);

export default router;
