import express from "express";
import {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
  sendRecent,
} from "../../controllers/UserDetailsController.js";
import {
  calculateAchievements,
  calculateLevel,
  // checkUpgrade,
} from "../../controllers/BadgeController.js";

const router = express.Router();

router.post("/addCategories", addCategories);
router.post("/updateProfile", updateProfile);
router.post("/joinCommunity", joinCommunity);
router.post("/leaveCommunity", leaveCommunity);
router.post("/achievements", calculateAchievements);
router.post("/level", calculateLevel);
// router.post("/upgrade", checkUpgrade);
router.post("/recent", sendRecent);

export default router;
