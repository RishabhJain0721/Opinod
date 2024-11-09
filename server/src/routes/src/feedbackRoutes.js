import express from "express";
import {
  sendFeedbacks,
  addFeedback,
  sendOneFeedback,
  supportMessage,
  getSupportMails,
  getOneSupportMail,
} from "../../controllers/FeedbackController.js";

const router = express.Router();

router.get("/", sendFeedbacks);
router.post("/add", addFeedback);
router.post("/getOne", sendOneFeedback);
router.post("/support", supportMessage);
router.get("/support", getSupportMails);
router.post("/support/getOne", getOneSupportMail);

export default router;
