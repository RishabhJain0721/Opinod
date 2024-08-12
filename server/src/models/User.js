import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedCategories: {
    type: [String],
    default: [],
  },
  joinedCommunities: {
    type: [String],
    default: [],
  },
  points: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: Object,
  },
  description: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  reddit: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: "",
  },
  likedPosts: {
    type: [String],
    default: [],
  },
  dislikedPosts: {
    type: [String],
    default: [],
  },
  likedComments: {
    type: [String],
    default: [],
  },
  dislikedComments: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: 0,
  },
  following: {
    type: [String],
    default: 0,
  },
  badges: {
    type: Array,
    default: [
      { name: "Active Contributor", unlocked: false, displayed: false },
      { name: "Subject Expert", unlocked: false, displayed: false },
      { name: "Knowledge Contributor", unlocked: false, displayed: false },
      { name: "Active Commenter", unlocked: false, displayed: false },
      { name: "Lively Debater", unlocked: false, displayed: false },
      { name: "Popular Post", unlocked: false, displayed: false },
      { name: "Insightful Analyst", unlocked: false, displayed: false },
      { name: "Top Contributor", unlocked: false, displayed: false },
      { name: "Community Leader", unlocked: false, displayed: false },
      { name: "Top Community Member", unlocked: false, displayed: false },
      { name: "Mentor", unlocked: false, displayed: false },
      { name: "Century Posts", unlocked: false, displayed: false },
      { name: "Active Engager", unlocked: false, displayed: false },
      { name: "Anniversary", unlocked: false, displayed: false },
    ],
  },
});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

export default User;
