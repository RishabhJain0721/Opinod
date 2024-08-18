import express from "express";
import {
  sendNews,
  sendNewsDetails,
  sendNewsByCategory,
  sendMostCommented,
  sendUpdatedNews,
  sendNextId,
} from "../../controllers/NewsController.js";

const router = express.Router();

router.post("/", sendNews);
router.post("/byId", sendNewsDetails);
router.post("/byCategory", sendNewsByCategory);
router.post("/mostCommented", sendMostCommented);
router.post("/update", sendUpdatedNews);
router.post("/nextId", sendNextId);

export default router;
