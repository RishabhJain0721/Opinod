import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    children: {
      type: [String],
      default: [],
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["post", "communityPost"],
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    reported: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
