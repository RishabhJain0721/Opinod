import mongoose from "mongoose";

// Define the schema for the Feedback model
const feedbackSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Feedback model using the schema
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
