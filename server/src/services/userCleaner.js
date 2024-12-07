import cron from "node-cron";
import User from "../models/User.js";

// Clears out unverified users from db every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  // Find unverified user records created more than 5 minutes ago
  const unverifiedUsers = await User.find({
    isVerified: false,
    createdAt: { $lt: fiveMinutesAgo },
  });

  console.log("Users going to be deleted : ", unverifiedUsers);
  // Delete unverified user records
  await User.deleteMany({
    _id: { $in: unverifiedUsers.map((user) => user._id) },
  });

  console.log("Cleanup task completed.");
});
