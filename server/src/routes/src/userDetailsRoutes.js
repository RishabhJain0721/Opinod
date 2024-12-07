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
  sendBadges,
  updateBadges,
  newsletterSignup,
  newsletterEmails,
} from "../../controllers/UserDetailsController.js";
import {
  calculateAchievements,
  calculateLevel,
  // checkUpgrade,
  sendPeopleWithBadges,
  sendAchievementMail,
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
router.post("/badges", sendBadges);
router.post("/updateBadges", updateBadges);
router.get("/peopleWithBadges", sendPeopleWithBadges);
router.post("/sendAchievementMail", sendAchievementMail);
router.post("/newsletterSignup", newsletterSignup);
router.get("/newsletterEmails", newsletterEmails);

export default router;
