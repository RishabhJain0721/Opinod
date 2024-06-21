import express from "express";
import {
  sendNews,
  sendNewsDetails,
  sendNewsByCategory,
  sendMostCommented,
} from "../../controllers/NewsController.js";

const router = express.Router();

router.get("/", sendNews);
router.post("/byId", sendNewsDetails);
router.post("/byCategory", sendNewsByCategory);
router.post("/mostCommented", sendMostCommented);

export default router;
