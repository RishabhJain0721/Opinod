import express from "express";
import {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
} from "../../controllers/UserDetailsController.js";
import { calculateAchievements } from "../../controllers/BadgeController.js";

const router = express.Router();

router.post("/addCategories", addCategories);
router.post("/updateProfile", updateProfile);
router.post("/joinCommunity", joinCommunity);
router.post("/leaveCommunity", leaveCommunity);
router.post("/achievements", calculateAchievements);

export default router;
