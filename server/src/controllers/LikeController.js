import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Recent from "../models/Recent.js";
import CommunityPost from "../models/CommunityPost.js";

const addLike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne({ username }, { likedPosts: 1, points: 1 });
    user.points += 5;
    user.likedPosts.push(postId);
    await user.save();
    await Recent.findOneAndUpdate(
      {},
      { $push: { all: { type: "like", postId, username } } }
    );
    const post = await Post.findById(postId, { upvotes: 1 });
    post.upvotes++;
    await post.save();
    res.status(200).send({ message: "Like added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to like" });
  }
};

const removeLike = async (req, res) => {
  const { username, postId } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ username }, { likedPosts: 1, points: 1 });
    user.points -= 5;
    user.likedPosts = user.likedPosts.filter((post) => post !== postId);
    await user.save();
    const post = await Post.findById(postId, { upvotes: 1 });
    post.upvotes--;
    await post.save();
    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove like" });
  }
};

const addCommentLike = async (req, res) => {
  const { username, commentId } = req.body;

  try {
    const user = await User.findOne(
      { username },
      { likedComments: 1, points: 1 }
    );
    user.points += 5;
    user.likedComments.push(commentId);
    await user.save();
    const comment = await Comment.findById(commentId, { upvotes: 1 });
    comment.upvotes++;
    await comment.save();
    res.status(200).send({ message: "Like added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to like" });
  }
};

const removeCommentLike = async (req, res) => {
  const { username, commentId } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne(
      { username },
      { likedComments: 1, points: 1 }
    );
    user.points -= 5;
    user.likedComments = user.likedComments.filter(
      (comment) => comment !== commentId
    );
    await user.save();
    const comment = await Comment.findById(commentId, { upvotes: 1 });
    comment.upvotes--;
    await comment.save();
    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove like" });
  }
};

const addCommunityPostLike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const community = await CommunityPost.findById(postId, { upvotes: 1 });
    community.upvotes++;
    await community.save();
    const user = await User.findOne({ username }, { likedPosts: 1, points: 1 });
    user.points += 5;
    user.likedPosts.push(postId);
    await user.save();
    await Recent.findOneAndUpdate(
      {},
      { $push: { all: { type: "communityLike", postId, username } } }
    );
    res.status(200).send({ message: "Like added successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to like" });
  }
};

const removeCommunityPostLike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const community = await CommunityPost.findById(postId, { upvotes: 1 });
    community.upvotes--;
    await community.save();
    const user = await User.findOne({ username }, { likedPosts: 1, points: 1 });
    user.points -= 5;
    user.likedPosts = user.likedPosts.filter((post) => post !== postId);
    await user.save();
    res.status(200).send({ message: "Like removed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Failed to remove like" });
  }
};

export {
  addLike,
  removeLike,
  addCommentLike,
  removeCommentLike,
  addCommunityPostLike,
  removeCommunityPostLike,
};
