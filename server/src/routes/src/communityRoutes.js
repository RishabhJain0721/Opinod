import express from "express";
import {
  sendCommunities,
  sendHomeCommunities,
  sendCommunityData,
  sendTopPosts,
  sendCommunityPosts,
  addPost,
  sendPostDetails,
  sendPostComments,
  getUnverifiedPosts,
  sendUnverifiedPostDetails,
  verifyPost,
  discardPost,
} from "../../controllers/CommunityController.js";

const router = express.Router();

router.get("/", sendCommunities);
router.get("/home", sendHomeCommunities);
router.post("/individual", sendCommunityData);
router.post("/subcategory", sendTopPosts);
router.post("/communityPosts", sendCommunityPosts);
router.post("/post", addPost);
router.post("/postDetails", sendPostDetails);
router.post("/postComments", sendPostComments);
router.get("/unverifiedPosts", getUnverifiedPosts);
router.post("/unverifiedPostDetails", sendUnverifiedPostDetails);
router.post("/verifyPost", verifyPost);
router.post("/discardPost", discardPost);

export default router;
