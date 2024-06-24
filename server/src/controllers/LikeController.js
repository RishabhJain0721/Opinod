import User from "../models/User.js";
import Post from "../models/Post.js";

const addLike = async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne({ username }, { likedPosts: 1 });
    user.likedPosts.push(postId);
    await user.save();
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
    const user = await User.findOne({ username }, { likedPosts: 1 });
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

export { addLike, removeLike };
