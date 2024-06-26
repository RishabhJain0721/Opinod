import express from "express";
import authRoutes from "./src/authRoutes.js";
import newsRoutes from "./src/newsRoutes.js";
import userDetailsRoutes from "./src/userDetailsRoutes.js";
import likeRoutes from "./src/likeRoutes.js";
import dislikeRoutes from "./src/dislikeRoutes.js";
import commentRoutes from "./src/commentRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/news", newsRoutes);
router.use("/user", userDetailsRoutes);
router.use("/like", likeRoutes);
router.use("/dislike", dislikeRoutes);
router.use("/comment", commentRoutes);

export default router;
