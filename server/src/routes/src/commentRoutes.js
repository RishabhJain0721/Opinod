import express from "express";
import {
  addTopComment,
  sendComments,
  addReply,
} from "../../controllers/CommentController.js";

const router = express.Router();

router.post("/getComments", sendComments);
router.post("/addTopComment", addTopComment);
router.post("/addReply", addReply);

export default router;
