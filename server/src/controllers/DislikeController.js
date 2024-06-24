import Post from "../models/Post.js";
import User from "../models/User.js";

const addDislike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne({ username }, { dislikedPosts: 1 });
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
    const user = await User.findOne({ username }, { dislikedPosts: 1 });
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

export { addDislike, removeDislike };
