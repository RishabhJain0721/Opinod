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
});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

export default User;
