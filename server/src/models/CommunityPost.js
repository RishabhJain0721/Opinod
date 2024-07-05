import mongoose from "mongoose";

// Define the schema for the CommunityPost model
const communityPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    community: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    author: {
      type: String,
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
    totalComments: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Create the CommunityPost model using the schema
const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);

export default CommunityPost;
