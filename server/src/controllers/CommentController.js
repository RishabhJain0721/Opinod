import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

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
  parentComment.childern.push(newComment._id);
  await parentComment.save();

  const post = await Post.findById(postId, { totalComments: 1 });
  post.totalComments++;
  await post.save();

  res.send({ message: "Reply Added successfully" });
};

const sendComments = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);
  const postComments = post.comments;

  const comments = await Comment.find({ _id: { $in: postComments } });

  res.send(comments);
};

export { addTopComment, addReply, sendComments };
