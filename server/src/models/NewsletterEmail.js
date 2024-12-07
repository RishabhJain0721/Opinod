import mongoose from "mongoose";

// Define the schema for the NewsletterEmail model
const newsletterEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the NewsletterEmail model using the schema
const NewsletterEmail = mongoose.model(
  "NewsletterEmail",
  newsletterEmailSchema
);

export default NewsletterEmail;
