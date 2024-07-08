import express from "express";
import {
  sendCommunities,
  sendCommunityData,
  sendTopPosts,
  addPost,
} from "../../controllers/CommunityController.js";

const router = express.Router();

router.get("/", sendCommunities);
router.post("/individual", sendCommunityData);
router.post("/subcategory", sendTopPosts);
router.post("/post", addPost);

export default router;
