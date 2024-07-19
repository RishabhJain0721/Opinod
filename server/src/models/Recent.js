import mongoose from "mongoose";

// Define the schema for the Recent model
const recentSchema = new mongoose.Schema({
  all: {
    type: [{}],
    required: true,
  },
});

// Create the Recent model using the schema
const Recent = mongoose.model("Recent", recentSchema);

export default Recent;
