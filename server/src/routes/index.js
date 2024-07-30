import express from "express";
import authRoutes from "./src/authRoutes.js";
import newsRoutes from "./src/newsRoutes.js";
import userDetailsRoutes from "./src/userDetailsRoutes.js";
import likeRoutes from "./src/likeRoutes.js";
import dislikeRoutes from "./src/dislikeRoutes.js";
import commentRoutes from "./src/commentRoutes.js";
import communityRoutes from "./src/communityRoutes.js";
import searchRoutes from "./src/searchRoutes.js";
import feedbackRoutes from "./src/feedbackRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/news", newsRoutes);
router.use("/user", userDetailsRoutes);
router.use("/like", likeRoutes);
router.use("/dislike", dislikeRoutes);
router.use("/comment", commentRoutes);
router.use("/community", communityRoutes);
router.use("/search", searchRoutes);
router.use("/feedbacks", feedbackRoutes);

export default router;
