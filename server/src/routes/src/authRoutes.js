import express from "express";
import {
  signup,
  verifyEmail,
  login,
  adminLogin,
  forgotUsername,
  resetUsernamePage,
  resetUsername,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
} from "../../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/adminLogin", adminLogin);
router.post("/forgot-username", forgotUsername);
router.get("/reset-username-page", resetUsernamePage);
router.post("/reset-username", resetUsername);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password-page", resetPasswordPage);
router.post("/reset-password", resetPassword);

export default router;
