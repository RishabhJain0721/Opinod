import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import Community from "./models/Community.js";

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

// const communities = [
//   {
//     name: "World News",
//     description: "Stay updated with global headlines and significant events.",
//     image:
//       "https://img.freepik.com/free-vector/earth-inside-network-lines_1017-8010.jpg?t=st=1720016308~exp=1720019908~hmac=224f5a30037bde3dc1e834372c753685c969e1011ce336e92c4b42c7dd28f076&w=740",
//     subCategories: ["Regional", "International Relations", "Global Issues"],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Politics",
//     description: "Explore political news, analyses, and expert opinions.",
//     image:
//       "https://img.freepik.com/free-vector/election-campaign-scenes_23-2148686748.jpg?t=st=1720019684~exp=1720023284~hmac=7c224574088d42ed18229e69275bd1895b40aedae4567bd92a617fa216fd4bb2&w=740",
//     subCategories: ["National", "Political Theory", "International"],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Business",
//     description:
//       "Get insights into business news, market trends, and entrepreneurship.",
//     image:
//       "https://img.freepik.com/free-vector/lying-arrow-concept-illustration_114360-8531.jpg?t=st=1720019281~exp=1720022881~hmac=aadf5f5820d4b1de1f5d4e15ec26ba84fcbe382ba60fa3e9dd4cecaa8e9ffe4c&w=740",
//     subCategories: [
//       "Market News",
//       "Industry News",
//       "Startups and Entrepreneurship",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Technology",
//     description:
//       "Discover the latest in tech innovations, gadgets, and digital trends.",
//     image:
//       "https://img.freepik.com/free-vector/internet-communication_24877-51941.jpg?t=st=1720019835~exp=1720023435~hmac=96e323f38083b39fa5fe31289002804c7b8c0b697be9abd1b9dc0c339e66b018&w=740",
//     subCategories: [
//       "Tech News",
//       "Gadgets and Devices",
//       "Software and Apps",
//       "Innovations and Startups",
//       "Cybersecurity",
//       "Artificial Intelligence",
//       "Blockchain and Cryptocurrency",
//       "Tech Policy and Regulation",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Science",
//     description:
//       "Delve into scientific discoveries, research, and technological advancements.",
//     image:
//       "https://img.freepik.com/free-vector/internet-communication_24877-51941.jpg?t=st=1720019835~exp=1720023435~hmac=96e323f38083b39fa5fe31289002804c7b8c0b697be9abd1b9dc0c339e66b018&w=740",
//     subCategories: [
//       "Space and Astronomy",
//       "Life Sciences",
//       "Physical Sciences",
//       "Scientific Research",
//       "Environment",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Health",
//     description:
//       "Find health news, wellness tips, medical breakthroughs, and lifestyle advice.",
//     image:
//       "https://img.freepik.com/free-vector/internet-communication_24877-51941.jpg?t=st=1720019835~exp=1720023435~hmac=96e323f38083b39fa5fe31289002804c7b8c0b697be9abd1b9dc0c339e66b018&w=740",
//     subCategories: [
//       "Medical News",
//       "Nutrition and Fitness",
//       "Mental Health",
//       "Diseases and Conditions",
//       "Healthcare Industry",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Environment",
//     description:
//       "Learn about environmental conservation, sustainability, and climate change.",
//     image:
//       "https://img.freepik.com/free-photo/green-world-with-tree-background_1048-1484.jpg?ga=GA1.1.2051599425.1719947998&semt=sph",
//     subCategories: [
//       "Climate Science",
//       "Conservation",
//       "Sustainability",
//       "Environmental Policy",
//       "Pollution",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Sports",
//     description: "Stay on top of sports news, scores, and athlete interviews.",
//     image:
//       "https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg?t=st=1720019906~exp=1720023506~hmac=c5bb5f450f0593300b398acebdc605c41c944799a7eeb49d6aa9090546b99331&w=740",
//     subCategories: [
//       "Events and Competitions",
//       "Major Sports",
//       "Sports Science",
//       "Athlete Profiles",
//       "Sports Business",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Entertainment",
//     description:
//       "Get the latest in movies, music, TV shows, and celebrity news.",
//     image:
//       "https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?t=st=1720020085~exp=1720023685~hmac=0440f783ffbd75d2f0ce273dda5910f82f36aa7d60385a6dc6a1143a0db7d34f&w=740",
//     subCategories: [
//       "Movies",
//       "Music",
//       "Television",
//       "Celebrity News",
//       "Gaming",
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Expert Opinions",
//     description: "Read insights and analyses from experts in various fields.",
//     image:
//       "https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?t=st=1720020085~exp=1720023685~hmac=0440f783ffbd75d2f0ce273dda5910f82f36aa7d60385a6dc6a1143a0db7d34f&w=740",
//     subscriberCount: 0,
//     parent: "special",
//   },
//   {
//     name: "Educational Resources",
//     description: "Access educational materials, courses, and learning tools.",
//     image:
//       "https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?t=st=1720020085~exp=1720023685~hmac=0440f783ffbd75d2f0ce273dda5910f82f36aa7d60385a6dc6a1143a0db7d34f&w=740",
//     subscriberCount: 0,
//     parent: "special",
//   },
//   {
//     name: "Book and Article Reviews",
//     description:
//       "Explore reviews and discussions on books and academic articles.",
//     image:
//       "https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?t=st=1720020085~exp=1720023685~hmac=0440f783ffbd75d2f0ce273dda5910f82f36aa7d60385a6dc6a1143a0db7d34f&w=740",
//     subscriberCount: 0,
//     parent: "special",
//   },
//   {
//     name: "Quiz Discussions",
//     description: "Join quizzes and discussions on various topics.",
//     image:
//       "https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?t=st=1720020085~exp=1720023685~hmac=0440f783ffbd75d2f0ce273dda5910f82f36aa7d60385a6dc6a1143a0db7d34f&w=740",
//     subscriberCount: 0,
//     parent: "special",
//   },
// ];

// communities.forEach(async (one) => {
//   const { name, description, image, subCategories, subscriberCount, parent } =
//     one;

//   const comm = new Community({
//     name,
//     description,
//     image,
//     subCategories,
//     subscriberCount,
//     parent,
//   });

//   await comm.save();
// });
