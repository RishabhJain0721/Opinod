import mongoose from "mongoose";

// Define the schema for the Support model
const supportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Support model using the schema
const Support = mongoose.model("Support", supportSchema);

export default Support;
