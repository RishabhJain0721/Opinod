import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";

const addDislike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedPosts: 1, points: 1 }
    );
    user.points += 5;
    user.dislikedPosts.push(postId);
    await user.save();
    const post = await Post.findById(postId, { downvotes: 1 });
    post.downvotes++;
    await post.save();
    res.status(200).send({ message: "Disike added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to dislike" });
  }
};

const removeDislike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedPosts: 1, points: 1 }
    );
    user.points -= 5;
    user.dislikedPosts = user.dislikedPosts.filter((post) => post !== postId);
    await user.save();
    const post = await Post.findById(postId, { downvotes: 1 });
    post.downvotes--;
    await post.save();
    res.status(200).send({ message: "Disike removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove dislike" });
  }
};

const addCommentDislike = async (req, res) => {
  const { username, commentId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedComments: 1, points: 1 }
    );
    user.points += 5;
    user.dislikedComments.push(commentId);
    await user.save();
    const comment = await Comment.findById(commentId, { downvotes: 1 });
    comment.downvotes++;
    await comment.save();
    res.status(200).send({ message: "Disike added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to dislike" });
  }
};

const removeCommentDislike = async (req, res) => {
  const { username, commentId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedComments: 1, points: 1 }
    );
    user.points -= 5;
    user.dislikedComments = user.dislikedComments.filter(
      (comment) => comment !== commentId
    );
    await user.save();
    const comment = await Comment.findById(commentId, { downvotes: 1 });
    comment.downvotes--;
    await comment.save();
    res.status(200).send({ message: "Disike removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove dislike" });
  }
};

const addCommunityPostDislike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedPosts: 1, points: 1 }
    );
    user.points += 5;
    user.dislikedPosts.push(postId);
    await user.save();
    const post = await CommunityPost.findById(postId, { downvotes: 1 });
    post.downvotes++;
    await post.save();
    res.status(200).send({ message: "Disike added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to dislike" });
  }
};

const removeCommunityPostDislike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { dislikedPosts: 1, points: 1 }
    );
    user.points -= 5;
    user.dislikedPosts = user.dislikedPosts.filter((post) => post !== postId);
    await user.save();
    const post = await CommunityPost.findById(postId, { downvotes: 1 });
    post.downvotes--;
    await post.save();
    res.status(200).send({ message: "Disike removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove dislike" });
  }
};

export {
  addDislike,
  removeDislike,
  addCommentDislike,
  removeCommentDislike,
  addCommunityPostDislike,
  removeCommunityPostDislike,
};
