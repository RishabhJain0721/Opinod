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
  isActive: {
    type: Boolean,
    default: true,
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
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  badges: {
    type: Array,
    default: [
      {
        name: "Active Contributor",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Subject Expert",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Knowledge Contributor",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Active Commenter",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Lively Debater",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Popular Post",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Insightful Analyst",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Top Contributor",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Community Leader",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Top Community Member",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      { name: "Mentor", unlocked: false, displayed: false, rewarded: false },
      {
        name: "Century Posts",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Active Engager",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
      {
        name: "Anniversary",
        unlocked: false,
        displayed: false,
        rewarded: false,
      },
    ],
  },
});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

export default User;
