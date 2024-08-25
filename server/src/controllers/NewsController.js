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
    const topComment = await getTopComment(post.comments);
    if (topComment) {
      post.opinionId = topComment._id;
      post.opinion = topComment.text;
      post.opinionAuthorPhoto =
        "https://as1.ftcdn.net/v2/jpg/07/07/74/98/1000_F_707749874_RN9BR4Z3SsqVPlR7grenMIegMFfXGacE.jpg";
      post.opinionAuthorName = topComment.author;
      post.opinionDate = topComment.createdAt;
      post.commentUpvotes = topComment.upvotes;
      post.commentDownvotes = topComment.downvotes;
    }
  }
};

const fetchFullDetails = async (articles) => {
  try {
    // Fetch full details of the first 9 posts
    const fullArticles = [];
    for (let article of articles) {
      const post = await Post.findById(article._id, {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
        upvotes: 1,
        downvotes: 1,
      }).lean();
      if (post) {
        fullArticles.push(post);
      }
    }

    await enrichPostsWithTopComment(fullArticles);
    return fullArticles;
  } catch (error) {
    console.error("Error fetching full details:", error);
  }
};

const sendMostCommented = async (username, res, skip, pageSize) => {
  const user = await User.findOne({ username });
  const posts = await Post.find(
    { category: { $in: user.selectedCategories } },
    { totalComments: 1 }
  ).lean();

  // Sort the posts in descending order based on totalComments
  posts.sort((a, b) => b.totalComments - a.totalComments);

  const paginatedPosts = posts.slice(skip, skip + pageSize);
  const mostCommented = await fetchFullDetails(paginatedPosts);

  // await enrichPostsWithTopComment(posts);
  res.status(200).send(mostCommented);
};

const sendMostReacted = async (username, res, skip, pageSize) => {
  const user = await User.findOne({ username });
  const posts = await Post.find(
    { category: { $in: user.selectedCategories } },
    { upvotes: 1, downvotes: 1 }
  ).lean();

  // Sort the posts in descending order based on totalComments
  posts.sort((a, b) => b.upvotes + b.downvotes - (a.upvotes + a.downvotes));

  const paginatedPosts = posts.slice(skip, skip + pageSize);
  const mostReacted = await fetchFullDetails(paginatedPosts);

  // await enrichPostsWithTopComment(posts);
  res.status(200).send(mostReacted);
};

const sendNews = async (req, res) => {
  const { categories } = req.body;

  let trending = [];

  const reqFields = {
    title: 1,
    image: 1,
    publishedAt: 1,
    source: 1,
    category: 1,
    comments: 1,
    upvotes: 1,
    downvotes: 1,
  };

  if (categories.length >= 3) {
    [trending[0]] = await Post.find({ category: categories[0] }, reqFields)
      .limit(1)
      .lean();
    [trending[1]] = await Post.find({ category: categories[1] }, reqFields)
      .limit(1)
      .lean();
    [trending[2]] = await Post.find({ category: categories[2] }, reqFields)
      .limit(1)
      .lean();
  } else if (categories.length === 2) {
    [trending[0]] = await Post.find({ category: categories[0] }, reqFields)
      .limit(1)
      .lean();
    [trending[1]] = await Post.find({ category: categories[0] }, reqFields)
      .limit(1)
      .lean();
    [trending[2]] = await Post.find({ category: categories[1] }, reqFields)
      .limit(1)
      .lean();
  } else if (categories.length === 1) {
    trending = await Post.find({ category: categories[0] }, reqFields)
      .limit(3)
      .lean();
  } else {
    trending = await Post.find({ category: "General" }, reqFields)
      .limit(3)
      .lean();
  }
  // trending = await Post.find({ category: { $in: categories } }).limit(3);

  await enrichPostsWithTopComment(trending);

  res.status(200).send({ trendingArticles: trending });
};

const sendNewsDetails = async (req, res) => {
  const { id } = req.body;
  const news = await Post.findById(id);
  res.status(200).send(news);
};

const sendNewsByCategory = async (req, res) => {
  const { category, username, page } = req.body;
  const pageSize = 9; // Number of posts per page

  // Calculate the number of posts to skip based on the page number
  const skip = (page - 1) * pageSize;

  let news;

  // if (category == "Most Commented") {
  //   sendMostCommented(username, res, skip, pageSize);
  //   return;
  // }
  // if (category == "Most Reacted") {
  //   sendMostReacted(username, res, skip, pageSize);
  //   return;
  // }

  if (category == "Trending") {
    const posts = await Post.find(
      { category: "General" },
      {
        title: 1,
        image: 1,
        publishedAt: 1,
        source: 1,
        category: 1,
        comments: 1,
        upvotes: 1,
        downvotes: 1,
      }
    )
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(pageSize)
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
        upvotes: 1,
        downvotes: 1,
      }
    )
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();
    await enrichPostsWithTopComment(posts);
    news = posts;
  }
  res.status(200).send(news);
};

const sendUpdatedNews = async (req, res) => {
  const { postId } = req.body;
  try {
    const updatedNews = await Post.findById(postId, {
      title: 1,
      image: 1,
      publishedAt: 1,
      source: 1,
      category: 1,
      comments: 1,
      upvotes: 1,
      downvotes: 1,
    }).lean();
    const topComment = await getTopComment(updatedNews.comments);
    if (topComment) {
      updatedNews.opinionId = topComment._id;
      updatedNews.opinion = topComment.text;
      updatedNews.opinionAuthorPhoto =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQivPo5rKZdrbIIjkfi-z9TAyZWGGyN2DHIA&s";
      updatedNews.opinionAuthorName = topComment.author;
      updatedNews.opinionDate = topComment.createdAt;
      updatedNews.commentUpvotes = topComment.upvotes;
      updatedNews.commentDownvotes = topComment.downvotes;
    }
    res.status(200).send(updatedNews);
  } catch (error) {
    res.status(500).send("Failed to fetch updated news");
  }
};

const sendNextId = async (req, res) => {
  const { type, time, cat } = req.body;
  let nextId;
  try {
    if (Array.isArray(cat)) {
      const query = {
        publishedAt: type === "left" ? { $gt: time } : { $lt: time },
        category: { $in: cat },
      };

      nextId = await Post.find(query, { _id: 1 })
        .sort({ _id: type === "left" ? 1 : -1 })
        .limit(1);
    } else {
      const query = {
        publishedAt: type === "left" ? { $gt: time } : { $lt: time },
        category: { $eq: cat },
      };

      nextId = await Post.find(query, { _id: 1 })
        .sort({ _id: type === "left" ? 1 : -1 })
        .limit(1);
    }

    res.status(200).send(nextId[0]._id);
  } catch (error) {
    res.status(400).send("Failed to fetch");
  }
};

export {
  sendNews,
  sendNewsDetails,
  sendNewsByCategory,
  sendMostCommented,
  sendUpdatedNews,
  sendNextId,
};
