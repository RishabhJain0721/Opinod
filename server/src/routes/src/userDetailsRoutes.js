import express from "express";
import {
  addCategories,
  updateProfile,
} from "../../controllers/UserDetailsController.js";

const router = express.Router();

router.post("/addCategories", addCategories);
router.post("/updateProfile", updateProfile);

export default router;
