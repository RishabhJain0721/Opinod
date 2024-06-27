import express from "express";
import {
  addLike,
  removeLike,
  addCommentLike,
  removeCommentLike,
} from "../../controllers/LikeController.js";

const router = express.Router();

router.post("/add", addLike);
router.post("/remove", removeLike);
router.post("/comment/add", addCommentLike);
router.post("/comment/remove", removeCommentLike);

export default router;
