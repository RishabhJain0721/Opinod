import express from "express";
import {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
  sendRecent,
  sendUserDetails,
  sendUserPosts,
  sendUserComments,
  followUser,
  unfollowUser,
  tester,
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
router.post("/getDetails", sendUserDetails);
router.post("/getPosts", sendUserPosts);
router.post("/getComments", sendUserComments);
router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);
router.post("/test", tester);

export default router;
