import express from "express";
import {
  sendFeedbacks,
  addFeedback,
  sendOneFeedback,
} from "../../controllers/FeedbackController.js";

const router = express.Router();

router.get("/", sendFeedbacks);
router.post("/add", addFeedback);
router.post("/getOne", sendOneFeedback);

export default router;
