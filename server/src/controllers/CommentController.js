import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const addTopComment = async (req, res) => {
  const { postId, text, author } = req.body;

  // Updating the comment in comments collection
  const newComment = new Comment({
    postId,
    parentId: postId,
    text,
    author,
  });

  await newComment.save();

  // Update the post with the new comment in posts collection
  const post = await Post.findById(postId);
  post.comments.push(newComment._id);
  post.totalComments++;
  await post.save();

  const user = await User.findOneAndUpdate(
    { username: author },
    { $inc: { points: 20 } },
    { new: true }
  );

  res.send({ message: "Comment Added successfully" });
};

const addTopCommunityComment = async (req, res) => {
  const { postId, text, author } = req.body;

  // Updating the comment in comments collection
  const newComment = new Comment({
    postId,
    parentId: postId,
    text,
    author,
  });

  await newComment.save();

  // Update the post with the new comment in posts collection
  const post = await CommunityPost.findById(postId);
  post.comments.push(newComment._id);
  post.totalComments++;
  await post.save();

  const user = await User.findOneAndUpdate(
    { username: author },
    { $inc: { points: 20 } },
    { new: true }
  );

  res.send({ message: "Comment Added successfully" });
};

const addReply = async (req, res) => {
  const { postId, parentId, text, author } = req.body;

  // Updating the comment in comments collection
  const newComment = new Comment({
    postId,
    parentId,
    text,
    author,
  });

  await newComment.save();

  //Update the parent comment with the new reply in comments collection
  const parentComment = await Comment.findById(parentId);
  parentComment.children.push(newComment._id);
  await parentComment.save();

  const post = await Post.findById(postId, { totalComments: 1 });
  post.totalComments++;
  await post.save();

  const user = await User.findOneAndUpdate(
    { username: author },
    { $inc: { points: 20 } },
    { new: true }
  );

  res.send({ message: "Reply Added successfully" });
};

const addCommunityReply = async (req, res) => {
  const { postId, parentId, text, author } = req.body;

  // Updating the comment in comments collection
  const newComment = new Comment({
    postId,
    parentId,
    text,
    author,
  });

  await newComment.save();

  //Update the parent comment with the new reply in comments collection
  const parentComment = await Comment.findById(parentId);
  parentComment.children.push(newComment._id);
  await parentComment.save();

  const post = await CommunityPost.findById(postId, { totalComments: 1 });
  post.totalComments++;
  await post.save();

  const user = await User.findOneAndUpdate(
    { username: author },
    { $inc: { points: 20 } },
    { new: true }
  );

  res.send({ message: "Reply Added successfully" });
};

const sendTopComments = async (req, res) => {
  const { numberOfOpinions, page } = req.body;
  console.log(numberOfOpinions, page);

  // Calculate the number of posts to skip based on the page number
  const skip = (page - 1) * numberOfOpinions;
  console.log(skip);

  try {
    const topComments = await Comment.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          $expr: { $eq: ["$postId", "$parentId"] },
        },
      },
      {
        $addFields: {
          totalVotes: { $add: ["$upvotes", "$downvotes"] },
        },
      },
      {
        $sort: { totalVotes: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: numberOfOpinions,
      },
    ]).exec();

    topComments.forEach((comment) => console.log(comment._id));

    //Adding post data to top comments
    for (let i = 0; i < topComments.length; i++) {
      const post = await Post.findById(topComments[i].postId, {
        title: 1,
        category: 1,
      });
      topComments[i].post = post;
      const authorPicture = await User.findOne(
        { username: topComments[i].author },
        { profilePicture: 1 }
      );
      topComments[i].authorPicture = authorPicture;
    }

    res.status(200).send(topComments);
  } catch (error) {
    res.status(404).send({ message: "No comments found", error });
  }
};

const sendComments = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);
  const postComments = post.comments;

  const comments = await Comment.find({ _id: { $in: postComments } });

  res.send(comments);
};

const sendCommentAndReplies = async (req, res) => {
  const { commentId } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    const replies = await Comment.find({ _id: { $in: comment.children } });
    res.status(200).send({ comment, replies });
  } catch (error) {
    res.status(404).send({ message: "Comment not found", error });
  }
};

export {
  addTopComment,
  addTopCommunityComment,
  addReply,
  addCommunityReply,
  sendComments,
  sendCommentAndReplies,
  sendTopComments,
};
