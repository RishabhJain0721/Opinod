import cron from "node-cron";
import axios from "axios";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import scraper from "./scraper.js";

const fetchNews = async (value) => {
  const API_KEY = process.env.NEWS_API_KEY;
  const news = await axios.get(
    `https://gnews.io/api/v4/top-headlines?category=${value}&max=5&lang=en&country=in&apikey=736553ecd22efffd34f56e708348cdba#`
  );

  return news.data.articles;
};

export const fetchNewsForCategories = async () => {
  console.log("Fetching news for all categories");
  const cat = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
    "world",
    "nation",
  ];

  for (let i = 0; i < cat.length; i++) {
    const articles = await fetchNews(cat[i]);

    //save the news articles in the database
    for (let j = 0; j < articles.length; j++) {
      const article = articles[j];
      console.log("Post is:", article.title);

      const body = await scraper(articles[j].url);

      const post = new Post({
        title: article.title,
        content: body ? body : article.description, //if fetching takes more time and body is not fetched, use description
        image: article.image,
        publishedAt: new Date().toISOString(),
        category: cat[i].charAt(0).toUpperCase() + cat[i].slice(1),
        source: article.source.name,
      });

      await post.save();

      // Wait for 3 seconds (3000 milliseconds) before proceeding
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

// fetchNewsForCategories();

// Schedule the first task to run at 6:00 AM
cron.schedule(
  "0 6 * * *",
  () => {
    console.log("6:00 AM News update");
    // Call the task to fetch news for each category
    fetchNewsForCategories();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// Schedule the second task to run at 6:00 PM
// cron.schedule(
//   "0 18 * * *",
//   () => {
//     console.log("6:00 PM News update");
//     // Call the task to fetch news for each category
//     fetchNewsForCategories();
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata",
//   }
// );

// Forbidden code
// Don't uncomment this or you shall suffer.

// const delAllPosts = async () => {
//   await Post.deleteMany({});
// };

// delAllPosts();

// const delAllComments = async () => {
//   await Comment.deleteMany({});
// };

// delAllComments();
