import express from "express";
import {
  sendCommunities,
  sendCommunityData,
  addPost,
} from "../../controllers/CommunityController.js";

const router = express.Router();

router.get("/", sendCommunities);
router.post("/individual", sendCommunityData);
router.post("/post", addPost);

export default router;
