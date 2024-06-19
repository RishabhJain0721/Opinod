import express from "express";
import {
  sendNews,
  sendNewsDetails,
  sendNewsByCategory,
} from "../../controllers/NewsController.js";

const router = express.Router();

router.post("/", sendNews);
router.post("/byId", sendNewsDetails);
router.post("/byCategory", sendNewsByCategory);

export default router;
