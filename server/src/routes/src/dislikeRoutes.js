import express from "express";
import {
  addDislike,
  removeDislike,
  addCommentDislike,
  removeCommentDislike,
} from "../../controllers/DislikeController.js";

const router = express.Router();

router.post("/add", addDislike);
router.post("/remove", removeDislike);
router.post("/comment/add", addCommentDislike);
router.post("/comment/remove", removeCommentDislike);

export default router;
