import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import "../services/newsUpdater.js";
const getTopComment = async (commentIds) => {
  try {
    const comments = await Comment.find({ _id: { $in: commentIds } }).select(
      "-postId -parentId -children"
    );
    comments.sort(
      (a, b) => b.upvotes + b.downvotes - (a.upvotes + a.downvotes)
    );
    return comments[0];
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const enrichPostsWithTopComment = async (posts) => {
  for (let post of posts) {
    const topComment = await getTopComment(post.comments); // Assuming the first comment ID is available
    if (topComment) {
      post.opinion = topComment.text;
      post.opinionAuthorPhoto =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQivPo5rKZdrbIIjkfi-z9TAyZWGGyN2DHIA&s";
      post.opinionAuthorName = topComment.author;
      post.opinionDate = topComment.createdAt;
      post.upvotes = topComment.upvotes;
      post.downvotes = topComment.downvotes;
    }
  }
};

const sendNews = async (req, res) => {
  const { username } = req.body;
  let trending, daily;

  daily = await Post.find(
    { category: "Nation" },
    { title: 1, image: 1, publishedAt: 1, source: 1, category: 1, comments: 1 }
  )
    .limit(3)
    .lean();

  await enrichPostsWithTopComment(daily);

  if (!username) {
    trending = await Post.find(
      { category: "General" },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
      }
    )
      .limit(3)
      .lean();
  } else {
    const user = await User.findOne({ username });
    trending = await Post.find(
      { category: { $in: user.selectedCategories } },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
      }
    )
      .limit(3)
      .lean();
  }
  await enrichPostsWithTopComment(trending);

  console.log("Top Voted Articles:", trending);
  console.log("Top Commented Articles:", daily);

  res.status(200).send({ trendingArticles: trending, dailyArticles: daily });
};

const sendNewsDetails = async (req, res) => {
  const { id } = req.body;
  const news = await Post.findById(id);
  res.status(200).send(news);
};

const sendNewsByCategory = async (req, res) => {
  const { category, username } = req.body;
  let news;

  if (category == "Trending") {
    const user = await User.findOne({ username });
    const posts = await Post.find(
      {
        category: { $in: user.selectedCategories },
      },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
      }
    )
      .limit(6)
      .lean();

    await enrichPostsWithTopComment(posts);
    news = posts;
  } else if (category == "Daily") {
    const posts = await Post.find(
      { category: "Nation" },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
      }
    )
      .limit(6)
      .lean();

    await enrichPostsWithTopComment(posts);

    news = posts;
  } else {
    const posts = await Post.find(
      { category },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
      }
    )
      .limit(6)
      .lean();
    await enrichPostsWithTopComment(posts);
    news = posts;
  }
  res.status(200).send(news);
};

export { sendNews, sendNewsDetails, sendNewsByCategory };
