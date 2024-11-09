import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
// console.log(`Primary ${process.pid} is running`);

// Fork workers based on the number of CPU cores
// for (let i = 0; i < numCPUs; i++) {
//   cluster.fork();
// }

// Listen for dying workers and restart them
// cluster.on("exit", (worker, code, signal) => {
//   console.log(`Worker ${worker.process.pid} died. Restarting...`);
//   cluster.fork();
// });
// } else {

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware to add custom headers to all responses
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

// Validate required environment variables
if (!MONGO_URI) {
  throw new Error("MONGODB_CONNECTION_STRING is not set");
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown handler
    // process.on("SIGTERM", async () => {
    //   console.log("Received SIGTERM. Shutting down...");
    //   await mongoose.disconnect();
    //   server.close(() => {
    //     console.log("Server closed");
    //     process.exit(0);
    //   });
    // });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with non-zero status code
  });

app.use("/api", routes);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({ message: "Service Unavailable" });
  }
});

// Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
