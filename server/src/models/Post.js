import mongoose from "mongoose";

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  category: {
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
});

// Create the Post model using the schema
const Post = mongoose.model("Post", postSchema);

export default Post;
