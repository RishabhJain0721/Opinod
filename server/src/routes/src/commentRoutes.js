import express from "express";
import {
  sendTopComments,
  addTopComment,
  sendComments,
  addTopCommunityComment,
  addReply,
  addCommunityReply,
  sendCommentAndReplies,
  reportComment,
  sendReportedComments,
  deleteComment,
} from "../../controllers/CommentController.js";

const router = express.Router();

router.post("/topComments", sendTopComments);
router.post("/getComments", sendComments);
router.post("/addTopComment", addTopComment);
router.post("/addTopCommunityComment", addTopCommunityComment);
router.post("/addReply", addReply);
router.post("/addCommunityReply", addCommunityReply);
router.post("/fetchCommentAndReplies", sendCommentAndReplies);
router.post("/report", reportComment);
router.get("/reportedComments", sendReportedComments);
router.post("/delete", deleteComment);

export default router;
