import express from "express";
import {
  addLike,
  removeLike,
  addCommentLike,
  removeCommentLike,
  addCommunityPostLike,
  removeCommunityPostLike,
} from "../../controllers/LikeController.js";

const router = express.Router();

router.post("/add", addLike);
router.post("/remove", removeLike);
router.post("/comment/add", addCommentLike);
router.post("/comment/remove", removeCommentLike);
router.post("/communityPost/add", addCommunityPostLike);
router.post("/communityPost/remove", removeCommunityPostLike);

export default router;
