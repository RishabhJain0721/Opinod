import express from "express";
import {
  sendTopComments,
  addTopComment,
  sendComments,
  addTopCommunityComment,
  addReply,
  addCommunityReply,
  sendCommentAndReplies,
} from "../../controllers/CommentController.js";

const router = express.Router();

router.post("/topComments", sendTopComments);
router.post("/getComments", sendComments);
router.post("/addTopComment", addTopComment);
router.post("/addTopCommunityComment", addTopCommunityComment);
router.post("/addReply", addReply);
router.post("/addCommunityReply", addCommunityReply);
router.post("/fetchCommentAndReplies", sendCommentAndReplies);

export default router;
