import mongoose from "mongoose";

// Define the schema for the Community model
const commSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  subCategories: {
    type: [String],
    required: false,
  },
  parent: {
    type: String,
  },
  subscriberCount: {
    type: Number,
    default: 0,
  },
});

// Create the Community model using the schema
const Community = mongoose.model("Community", commSchema);

export default Community;
