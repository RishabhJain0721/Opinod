import express from "express";
import {
  addTopComment,
  sendComments,
  addReply,
  sendCommentAndReplies,
} from "../../controllers/CommentController.js";

const router = express.Router();

router.post("/getComments", sendComments);
router.post("/addTopComment", addTopComment);
router.post("/addReply", addReply);
router.post("/fetchCommentAndReplies", sendCommentAndReplies);

export default router;
