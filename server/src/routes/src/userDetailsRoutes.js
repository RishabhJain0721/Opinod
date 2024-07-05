import express from "express";
import {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
} from "../../controllers/UserDetailsController.js";

const router = express.Router();

router.post("/addCategories", addCategories);
router.post("/updateProfile", updateProfile);
router.post("/joinCommunity", joinCommunity);
router.post("/leaveCommunity", leaveCommunity);

export default router;
