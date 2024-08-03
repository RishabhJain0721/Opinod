import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
// import Community from "./models/Community.js";
import Comment from "./models/Comment.js";
import Post from "./models/Post.js";

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
//     subCategories: [
//       {
//         name: "Regional",
//         image:
//           "https://img.freepik.com/free-vector/paper-map-concept-illustration_114360-2203.jpg?t=st=1720180981~exp=1720184581~hmac=564d960c6b1ae2967ce583be3a5899d4193ac0bb2e670e587d8b20006a73cd29&w=740",
//       },
//       {
//         name: "International Relations",
//         image:
//           "https://img.freepik.com/free-photo/business-handshake_53876-89043.jpg?t=st=1720181012~exp=1720184612~hmac=56e59ce757cb01867c9f278ffc82064ad685d0e4ef9d801f0ab8e8ef53f78640&w=740",
//       },
//       {
//         name: "Global Issues",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-climate-change-concept_23-2149096287.jpg?t=st=1720181070~exp=1720184670~hmac=7faf6135d543a4a640ee1d5d1002a3c5ae0e115e74df2ab37185d59473146074&w=740",
//       },
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Politics",
//     description: "Explore political news, analyses, and expert opinions.",
//     image:
//       "https://img.freepik.com/free-vector/election-campaign-scenes_23-2148686748.jpg?t=st=1720019684~exp=1720023284~hmac=7c224574088d42ed18229e69275bd1895b40aedae4567bd92a617fa216fd4bb2&w=740",
//     subCategories: [
//       {
//         name: "National",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-india-map-background_23-2148202407.jpg?t=st=1720180778~exp=1720184378~hmac=69ecf91544ec348eb3cb90ce96d47df7106720b620079095b69294857074bac1&w=740",
//       },
//       {
//         name: "Political Theory",
//         image:
//           "https://img.freepik.com/free-vector/patent-law-copyright-illustration_23-2148753973.jpg?t=st=1720180863~exp=1720184463~hmac=0a2639931aaa8e75fee1993c6de34a833438804cfac35a8601360f16cf724fc2&w=740",
//       },
//       {
//         name: "International",
//         image:
//           "https://img.freepik.com/free-vector/around-world-concept-illustration_114360-3981.jpg?t=st=1720180912~exp=1720184512~hmac=4ce30269a9f387d8af1ceabd79108c3d6e07c6e1a73e7aecdc9ef073db5c47a6&w=740",
//       },
//     ],
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
//       {
//         name: "Market News",
//         image:
//           "https://img.freepik.com/free-vector/business-enterprise-strategy-market-analysis-niche-selection-conquering-marketplace-studying-market-segmentation-planning-company-development_335657-2353.jpg?t=st=1720180605~exp=1720184205~hmac=b61476e74c2d22c988fbc517e1b230cc66b3578fc730e885c05e72c7150e828b&w=740",
//       },
//       {
//         name: "Industry News",
//         image:
//           "https://img.freepik.com/free-vector/industry-background-design_1284-1133.jpg?t=st=1720180664~exp=1720184264~hmac=96ea0253ad429660d16ca08fda78edb352b01f9086f4533ea7af7d776f75cf7f&w=740",
//       },
//       {
//         name: "Startups and Entrepreneurship",
//         image:
//           "https://img.freepik.com/free-vector/start-up-concept-with-rocket-gear-wheels_23-2147792537.jpg?t=st=1720180714~exp=1720184314~hmac=fb15c37a21d6b5895d5f6fec3f1012cf28c56c709842f2cbf632ab17eebb1fda&w=740",
//       },
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Technology",
//     description:
//       "Discover the latest in tech innovations, gadgets, and digital trends.",
//     image:
//       "https://img.freepik.com/free-photo/man-with-futuristic-device-medium-shot_23-2148864986.jpg?t=st=1720172993~exp=1720176593~hmac=698432f1ec559d5696e2b902fc232772e26d3f1dbd4221ecb25cb5bf25b08cfd&w=740",
//     subCategories: [
//       {
//         name: "Tech News",
//         image:
//           "https://img.freepik.com/free-photo/futuristic-time-machine_23-2151599351.jpg?t=st=1720180145~exp=1720183745~hmac=11f8422444fd27f3ee7acdb68d84fe4dc9ebbae459c9dfb46f35a065a35149e9&w=740",
//       },
//       {
//         name: "Gadgets and Devices",
//         image:
//           "https://img.freepik.com/free-photo/3d-workstation-with-computer-peripheral-devices_23-2150714175.jpg?t=st=1720180181~exp=1720183781~hmac=54e26aa7c1dee137fbf0ff910a79b7d0915446b3c0c61695530e50d244a71b3b&w=740",
//       },
//       {
//         name: "Software and Apps",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-api-illustration_23-2149365021.jpg?t=st=1720178758~exp=1720182358~hmac=de2c40c321e4d4d5789ba3048d1b6a0236df955ba1b6f9a145bfbd53d84422fe&w=740",
//       },
//       {
//         name: "Innovations and Startups",
//         image:
//           "https://img.freepik.com/free-vector/think-outside-box-concept-illustration_114360-15734.jpg?t=st=1720180233~exp=1720183833~hmac=cabd3ad15a3fe27a4743de390aaae6c7e2dc434f7adb350612ac3b491259315e&w=740",
//       },
//       {
//         name: "Cybersecurity",
//         image:
//           "https://img.freepik.com/free-vector/data-protection-concept_1284-10819.jpg?t=st=1720180409~exp=1720184009~hmac=ea83b1f8dd1c3b74b35ddb4a6eacfcd127c33189fc74775c1efd3ed727b0ae58&w=740",
//       },
//       {
//         name: "Artificial Intelligence",
//         image:
//           "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg?t=st=1720180362~exp=1720183962~hmac=0fd9fb4ec1add6f8a4b8ff87328f38ef6fd8ef2e5611af494ef6864c5f3b7bc7&w=740",
//       },
//       {
//         name: "Blockchain and Cryptocurrency",
//         image:
//           "https://img.freepik.com/free-vector/flat-design-cryptocurrency-concept-with-coin_23-2149162436.jpg?t=st=1720180459~exp=1720184059~hmac=8bdd6e0d80fedc46e49db6242581d6944deae98cc7e094a34fedf57ccf67ab04&w=740",
//       },
//       {
//         name: "Tech Policy and Regulation",
//         image:
//           "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7698.jpg?t=st=1720180494~exp=1720184094~hmac=4108397e66e5183eae3cb1ceb7adea02ca4500ff5ff9c709756a11854b7daaef&w=740",
//       },
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Science",
//     description:
//       "Delve into scientific discoveries, research, and technological advancements.",
//     image:
//       "https://img.freepik.com/free-vector/professional-female-scientist_23-2148421649.jpg?t=st=1720172953~exp=1720176553~hmac=b48828e8e702f27f75c1494c2d1863c7985d8ee55dd083b36dd7e2c0bf3d139b&w=740",
//     subCategories: [
//       {
//         name: "Space and Astronomy",
//         image:
//           "https://img.freepik.com/free-photo/astronaut-explores-outer-dark-space-generative-al_169016-28607.jpg?t=st=1720179688~exp=1720183288~hmac=4c75f6fae89693bcf28f4c08b56468ef81d9b83b833890fe290d0c0f7d28ec35&w=740",
//       },
//       {
//         name: "Life Sciences",
//         image:
//           "https://img.freepik.com/free-vector/biology-concept-with-retro-science-cartoon-icons-set_1284-7504.jpg?t=st=1720179711~exp=1720183311~hmac=cf1f36f5554d02f15172e6999f2d02d0cf341da2f30bbb873695c980e9a81703&w=740",
//       },
//       {
//         name: "Physical Sciences",
//         image:
//           "https://img.freepik.com/free-photo/atom-science-biotechnology-gold-neon-graphic_53876-167296.jpg?t=st=1720179910~exp=1720183510~hmac=92bd2c10e7d1d4a96dd6e00255615e68c0f335154ea148d6f102633f5dda89ba&w=740",
//       },
//       {
//         name: "Scientific Research",
//         image:
//           "https://img.freepik.com/free-photo/front-view-female-researcher-with-safety-glasses-test-tube_23-2148799274.jpg?t=st=1720179930~exp=1720183530~hmac=bb6e562b0c30f3dbb20e8b21022147a397232c6b90b100ab4ec9030cf86e1c3e&w=740",
//       },
//       {
//         name: "Environment",
//         image:
//           "https://img.freepik.com/free-photo/digital-art-with-planet-earth_23-2151064544.jpg?t=st=1720180007~exp=1720183607~hmac=411f98c700537282e2183d0f65c8f11fb9a5e6ae2a9b038b4252afd7ea75032c&w=740",
//       },
//     ],
//     subscriberCount: 0,
//     parent: "main",
//   },
//   {
//     name: "Health",
//     description:
//       "Find health news, wellness tips, medical breakthroughs, and lifestyle advice.",
//     image:
//       "https://img.freepik.com/free-vector/flat-illustration-doctors-nurses_23-2148910588.jpg?t=st=1720172874~exp=1720176474~hmac=7b5ab8d86a01ee3913ee9f0d3e075cfac337639c9755a42179698b2d089e1fa9&w=740",
//     subCategories: [
//       {
//         name: "Medical News",
//         image:
//           "https://img.freepik.com/free-vector/blue-medical-cross_24911-115956.jpg?t=st=1720179408~exp=1720183008~hmac=4e8e1d0afe00139209c4f3ff10efeddf5bd9cb3625e9aaf3a31041eb4dfebfb8&w=740",
//       },
//       {
//         name: "Nutrition and Fitness",
//         image:
//           "https://img.freepik.com/free-photo/portrait-man-woman-working-out_23-2148371758.jpg?t=st=1720179540~exp=1720183140~hmac=05ba4034e69b7566e3fb74c912820dfe5d1b0bbdb87d8cdab6e83c0f1d4a825c&w=740",
//       },
//       {
//         name: "Mental Health",
//         image:
//           "https://img.freepik.com/free-vector/scribble-style-human-head-background-mental-health-campaigns_1017-53484.jpg?t=st=1720179564~exp=1720183164~hmac=573f0719ed33a0dd0351fab8c1af1dd4f2267ee19521ac49d4992afa787de83c&w=740",
//       },
//       {
//         name: "Diseases and Conditions",
//         image:
//           "https://img.freepik.com/free-vector/sneezing-concept-illustration_114360-6865.jpg?t=st=1720179588~exp=1720183188~hmac=ed244711ac7adcf62dfd70c8785843a70a5ee1a6bca45567ca7b006d3cd3162e&w=740",
//       },
//       {
//         name: "Healthcare Industry",
//         image:
//           "https://img.freepik.com/free-photo/3d-cartoon-hospital-healthcare-scene_23-2151644053.jpg?t=st=1720179614~exp=1720183214~hmac=f55c794be28f91352443a4c8d7d82272fe02d7c250b4d1f2908705c76e887533&w=740",
//       },
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
//       {
//         name: "Climate Science",
//         image:
//           "https://img.freepik.com/free-vector/climate-change-concept-illustration_114360-9573.jpg?t=st=1720179204~exp=1720182804~hmac=aeda0290d922ef0d4223ffb8a110fe8fa77f6dc9ad1b687952f3eb0cc93ef6a5&w=740",
//       },
//       {
//         name: "Conservation",
//         image:
//           "https://img.freepik.com/free-vector/diplomat-concept-idea-international-deplomatic-relations-country-worldwide-representation-citizens-protection-confflict-solution-isolated-vector-illustration_613284-1827.jpg?t=st=1720179263~exp=1720182863~hmac=48401deb5da0f147c0cbee936e1ea9baaa9c97374847af5eece78765c1a471df&w=740",
//       },
//       {
//         name: "Sustainability",
//         image:
//           "https://img.freepik.com/free-vector/wind-power-abstract-concept-vector-illustration-renewable-energy-green-electricity-supply-wind-turbine-power-generator-solar-panels-renewable-source-engineer-worker-abstract-metaphor_335657-5798.jpg?t=st=1720179370~exp=1720182970~hmac=aa405626de7c1896093cb4860cd619decf04235a1716c818c237a3849ec5714c&w=740",
//       },
//       {
//         name: "Environmental Policy",
//         image:
//           "https://img.freepik.com/free-vector/legal-statement-court-notice-judge-decision-judicial-system-lawyer-attorney-studying-papers-cartoon-character_335657-1598.jpg?t=st=1720179286~exp=1720182886~hmac=bccb1c9653d245b4a31c0ba59b2b728b62758d0d4b8b69a650c2d7013a27a30f&w=740",
//       },
//       {
//         name: "Pollution",
//         image:
//           "https://img.freepik.com/free-photo/climate-change-with-industrial-pollution_23-2149217816.jpg?t=st=1720179164~exp=1720182764~hmac=14628461afdc0dad65f69d56d8170b25666b2fd5fa4cd3f2c7f3741c0fb9f2a4&w=740",
//       },
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
//       {
//         name: "Events and Competitions",
//         image:
//           "https://img.freepik.com/free-vector/achievement-concept-illustration_114360-5847.jpg?t=st=1720174229~exp=1720177829~hmac=0772d415e276e42e0522dabfdbdc283ebeaeb8b93814a40225148820e0c74cb1&w=740",
//       },
//       {
//         name: "Major Sports",
//         image:
//           "https://img.freepik.com/free-photo/cricket-player-action-game-cricket-3d-render_1057-31915.jpg?t=st=1720174279~exp=1720177879~hmac=a2c910c400e34d48a2edd0c0c95520ef13cd45e340b224f720feb3e9ef62b93a&w=740",
//       },
//       {
//         name: "Sports Science",
//         image:
//           "https://img.freepik.com/free-vector/virtual-gym-concept_23-2148513660.jpg?t=st=1720174348~exp=1720177948~hmac=acd4ebdb950b4543244584dfb6722d1700c4a7ee7fb73625ac3ee3b27c197127&w=740",
//       },
//       {
//         name: "Athlete Profiles",
//         image:
//           "https://img.freepik.com/free-vector/cute-boy-running-treadmill-cartoon-vector-icon-illustration-people-sport-icon-concept-isolated_138676-7780.jpg?t=st=1720179044~exp=1720182644~hmac=328fd91cd782203ba7d84977a3df85402fa3010669ee10bb518de2a354430a25&w=740",
//       },
//       {
//         name: "Sports Business",
//         image:
//           "https://img.freepik.com/free-vector/cute-boy-running-treadmill-cartoon-vector-icon-illustration-people-sport-icon-concept-isolated_138676-7780.jpg?t=st=1720179044~exp=1720182644~hmac=328fd91cd782203ba7d84977a3df85402fa3010669ee10bb518de2a354430a25&w=740",
//       },
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
//       {
//         name: "Movies",
//         image:
//           "https://img.freepik.com/free-vector/retro-cinema-sign_1284-4024.jpg?t=st=1720172912~exp=1720176512~hmac=4e4dc8cef30a67c6230322e84bd6a9c393b76cd50144e6de91447953095f6758&w=740",
//       },
//       {
//         name: "Music",
//         image:
//           "https://img.freepik.com/free-vector/earth-inside-network-lines_1017-8010.jpg?t=st=1720016308~exp=1720019908~hmac=224f5a30037bde3dc1e834372c753685c969e1011ce336e92c4b42c7dd28f076&w=740",
//       },
//       {
//         name: "Television",
//         image:
//           "https://img.freepik.com/free-vector/people-watching-movie-home_23-2148557080.jpg?t=st=1720173523~exp=1720177123~hmac=a3d845341ce2e1cce7f463efdcc18089cd37465e9e0808461c2c374607f61cb2&w=740",
//       },
//       {
//         name: "Celebrity News",
//         image:
//           "https://img.freepik.com/free-vector/flat-hand-drawn-fashion-show-runway-illustration_23-2148829664.jpg?t=st=1720173765~exp=1720177365~hmac=ac5c6ae0956a9783c5195252e546762dc7400bb1a000ef3bea3236fa4b6002f5&w=740",
//       },
//       {
//         name: "Gaming",
//         image:
//           "https://img.freepik.com/free-vector/character-playing-videogame-concept_23-2148514183.jpg?t=st=1720174182~exp=1720177782~hmac=eb5a54824ebc56cb41d45518657c3d8c289f2fe7b8523f3b14ffbc5af18cce49&w=740",
//       },
//     ],
//     subscriberCount: 0,
//     parent: "main",
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

// const del = async () => {
//   await Community.deleteMany({ parent: "main" });
// };

// del();

// const launch = async () => {
//   const duplicates = await Post.aggregate([
//     {
//       $group: {
//         _id: "$title",
//         count: { $sum: 1 },
//       },
//     },
//   ]);

//   const titlesToDelete = duplicates
//     .filter((doc) => doc.count > 1)
//     .map((doc) => doc._id);

//   console.log(titlesToDelete.length);

//   for (let title of titlesToDelete) {
//     const deleteResult = await Post.deleteOne({ title: title });
//     console.log("Deleted: ", deleteResult);
//   }
// };

// launch();

// delete comments with no post
const launch = async () => {
  const comments = await Comment.find({});

  for (let comment of comments) {
    const post = await Post.findById(comment.postId);
    if (!post) {
      await Comment.deleteOne({ _id: comment._id });
    }
  }
};

launch();
