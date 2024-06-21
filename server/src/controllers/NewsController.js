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
      }).lean();
      if (post) {
        fullArticles.push(post);
      }
    }

    await enrichPostsWithTopComment(fullArticles);
    // console.log("Most comm :",fullArticles)
    return fullArticles;
  } catch (error) {
    console.error("Error fetching full details:", error);
  }
};

const sendMostCommented = async (username, res) => {
  const user = await User.findOne({ username });
  const posts = await Post.find(
    { category: { $in: user.selectedCategories } },
    { totalComments: 1 }
  ).lean();

  // Sort the posts in descending order based on totalComments
  posts.sort((a, b) => b.totalComments - a.totalComments);
  const mostCommented = await fetchFullDetails(posts.slice(0, 9));

  console.log("Most Commented Articles:", mostCommented);

  // await enrichPostsWithTopComment(posts);
  res.status(200).send(mostCommented);
};

const sendMostReacted = async (username,res)=>{
  const user = await User.findOne({ username });
  const posts = await Post.find(
    { category: { $in: user.selectedCategories } },
    { upvotes:1,downvotes:1 }
  ).lean();

  // Sort the posts in descending order based on totalComments
  posts.sort(
    (a, b) => b.upvotes + b.downvotes - (a.upvotes + a.downvotes)
  );
  const mostReacted = await fetchFullDetails(posts.slice(0, 9));

  console.log("Most Reacted Articles:", mostReacted);

  // await enrichPostsWithTopComment(posts);
  res.status(200).send(mostReacted);
}

const sendNews = async (req, res) => {
  let trending, daily;

  daily = await Post.find(
    { category: "Nation" },
    { title: 1, image: 1, publishedAt: 1, source: 1, category: 1, comments: 1 }
  )
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  await enrichPostsWithTopComment(daily);

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
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

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

  if (category == "Most Commented") {
    sendMostCommented(username, res);
    return;
  }
  if (category == "Most Reacted") {
    sendMostReacted(username, res);
    return;
  }

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
      }
    )
      .sort({ publishedAt: -1 })
      .limit(9)
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
      .sort({ publishedAt: -1 })
      .limit(9)
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
      .sort({ publishedAt: -1 })
      .limit(9)
      .lean();
    await enrichPostsWithTopComment(posts);
    news = posts;
  }
  res.status(200).send(news);
};

export { sendNews, sendNewsDetails, sendNewsByCategory, sendMostCommented };
