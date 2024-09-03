import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import User from "./models/User.js";

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

// async function updateBadgesWithRewardedField() {
//   try {
//     // Fetch all users
//     const users = await User.find();

//     // Iterate over each user and update their badges
//     for (const user of users) {
//       // Map over the badges array to add the 'rewarded' field if it's missing
//       const updatedBadges = user.badges.map((badge) => ({
//         ...badge,
//         rewarded: badge.rewarded !== undefined ? badge.rewarded : false,
//       }));

//       // Update the user's badges
//       user.badges = updatedBadges;

//       // Save the updated user document
//       await user.save();
//     }

//     console.log("All badges updated successfully with the rewarded field");
//   } catch (error) {
//     console.error("Error updating badges:", error);
//   }
// }

// updateBadgesWithRewardedField();
