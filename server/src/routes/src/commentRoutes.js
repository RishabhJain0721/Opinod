import express from "express";
import {
  sendTopComments,
  addTopComment,
  sendComments,
  addReply,
  sendCommentAndReplies,
} from "../../controllers/CommentController.js";

const router = express.Router();

router.post("/topComments", sendTopComments);
router.post("/getComments", sendComments);
router.post("/addTopComment", addTopComment);
router.post("/addReply", addReply);
router.post("/fetchCommentAndReplies", sendCommentAndReplies);

export default router;
