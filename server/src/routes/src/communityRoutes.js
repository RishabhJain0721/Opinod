import express from "express";
import {
  sendCommunities,
  sendCommunityData,
  sendTopPosts,
  sendCommunityPosts,
  addPost,
  sendPostDetails,
  sendPostComments,
} from "../../controllers/CommunityController.js";

const router = express.Router();

router.get("/", sendCommunities);
router.post("/individual", sendCommunityData);
router.post("/subcategory", sendTopPosts);
router.post("/communityPosts", sendCommunityPosts);
router.post("/post", addPost);
router.post("/postDetails", sendPostDetails);
router.post("/postComments", sendPostComments);

export default router;
