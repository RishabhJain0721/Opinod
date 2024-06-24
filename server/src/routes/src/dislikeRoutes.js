import express from "express";
import {
  addDislike,
  removeDislike,
} from "../../controllers/DislikeController.js";

const router = express.Router();

router.post("/add", addDislike);
router.post("/remove", removeDislike);

export default router;
