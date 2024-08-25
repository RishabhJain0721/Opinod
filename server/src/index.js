import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
// import Community from "./models/Community.js";
import Comment from "./models/Comment.js";
import Post from "./models/Post.js";
import { updateBadges } from "./services/badgeUpdater.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Middleware to add a custom header to all responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api", routes);
