import express from "express";
import {
  sendFeedbacks,
  addFeedback,
  sendOneFeedback,
  supportMessage,
} from "../../controllers/FeedbackController.js";

const router = express.Router();

router.get("/", sendFeedbacks);
router.post("/add", addFeedback);
router.post("/getOne", sendOneFeedback);
router.post("/support", supportMessage);

export default router;
