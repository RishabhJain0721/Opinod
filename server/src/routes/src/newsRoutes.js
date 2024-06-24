import express from "express";
import {
  sendNews,
  sendNewsDetails,
  sendNewsByCategory,
  sendMostCommented,
  sendUpdatedNews,
} from "../../controllers/NewsController.js";

const router = express.Router();

router.get("/", sendNews);
router.post("/byId", sendNewsDetails);
router.post("/byCategory", sendNewsByCategory);
router.post("/mostCommented", sendMostCommented);
router.post("/update", sendUpdatedNews);

export default router;
