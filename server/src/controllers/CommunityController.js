import Community from "../models/Community.js";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";
import User from "../models/User.js";
import Recent from "../models/Recent.js";

const topCommunityPosts = async (id, numberOfPosts) => {
  try {
    const topPosts = await CommunityPost.aggregate([
      { $match: { community: id } },
      { $addFields: { score: { $add: ["$upvotes", "$downvotes"] } } },
      { $sort: { score: -1 } },
      { $limit: numberOfPosts },
    ]);
    for (const post of topPosts) {
      const username = post.author;
      const profilePic = await User.findOne(
        { username },
        { profilePicture: 1 }
      ).exec();
      post.profilePicture = profilePic ? profilePic.profilePicture : null;
    }
    return topPosts;
  } catch (error) {
    console.log(error);
  }
};

const topSubcategoryPosts = async (subcategory, skip) => {
  try {
    const topPosts = await CommunityPost.aggregate([
      { $match: { subCategory: subcategory } },
      { $addFields: { score: { $add: ["$upvotes", "$downvotes"] } } },
      { $sort: { score: -1 } },
      { $skip: skip },
      { $limit: 9 },
    ]);
    for (const post of topPosts) {
      const username = post.author;
      const profilePic = await User.findOne(
        { username },
        { profilePicture: 1 }
      ).exec();
      post.profilePicture = profilePic ? profilePic.profilePicture : null;
    }
    return topPosts;
  } catch (error) {
    console.log(error);
  }
};

const sendCommunities = async (req, res) => {
  try {
    const communities = await Community.find({});
    res.status(200).send({ Message: "Successfully sent", communities });
  } catch (error) {
    res.status(404).send(error);
  }
};

const sendCommunityData = async (req, res) => {
  const { id } = req.body;
  try {
    const community = await Community.findById(id, {
      name: 1,
      subCategories: 1,
    }).lean();
    const subcategories = community.subCategories;
    const name = community.name;
    const topPosts = await topCommunityPosts(id, 2);
    res.status(200).send({ subcategories, name, topPosts });
  } catch (error) {
    res.status(404).send(error);
  }
};

const sendTopPosts = async (req, res) => {
  const { subcategory, page } = req.body;
  console.log(subcategory, page);
  const skip = (page - 1) * 9;
  try {
    const topPosts = await topSubcategoryPosts(subcategory, skip);
    console.log(topPosts);
    res.status(200).send({ topPosts });
  } catch (error) {
    res.status(400).send({ Message: "Failed to fetch" });
  }
};

const sendCommunityPosts = async (req, res) => {
  const { id, page } = req.body;
  const skip = (page - 1) * 9;
  console.log(id, page);
  try {
    const posts = await CommunityPost.aggregate([
      { $match: { community: id } },
      { $addFields: { score: { $add: ["$upvotes", "$downvotes"] } } },
      { $sort: { score: -1 } },
      { $skip: skip },
      { $limit: 9 },
    ]);
    for (const post of posts) {
      const username = post.author;
      const profilePic = await User.findOne(
        { username },
        { profilePicture: 1 }
      ).exec();
      post.profilePicture = profilePic ? profilePic.profilePicture : null;
    }
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ Message: "Failed to fetch" });
  }
};

const addPost = async (req, res) => {
  const { title, description, communityId, selectedSubcategory, username } =
    req.body;
  const newPost = new CommunityPost({
    title,
    description,
    community: communityId,
    subCategory: selectedSubcategory,
    author: username,
  });

  const user = await User.findOneAndUpdate(
    { username },
    { $inc: { points: 50 } },
    { new: true }
  );

  try {
    const np = await newPost.save();
    const postId = np._id;
    console.log(postId);
    await Recent.findOneAndUpdate(
      {},
      { $push: { all: { type: "post", postId, username } } }
    );
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

const sendPostDetails = async (req, res) => {
  const { id } = req.body;
  try {
    const post = await CommunityPost.findById(id).lean();
    const user = await User.findOne(
      { username: post.author },
      { profilePicture: 1 }
    ).exec();
    post.profilePic = user.profilePicture;
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const sendPostComments = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const post = await CommunityPost.findById(id);
    const postComments = post.comments;
    const comments = await Comment.find({ _id: { $in: postComments } }).lean();

    for (const comment of comments) {
      const author = await User.findOne(
        { username: comment.author },
        { profilePicture: 1, _id: 0 }
      ).lean();
      comment.profilePicture = author.profilePicture;
    }

    res.status(200).send(comments);
  } catch (error) {
    res.status(400).send(error);
  }
};

export {
  sendCommunities,
  sendCommunityData,
  addPost,
  sendTopPosts,
  sendCommunityPosts,
  sendPostDetails,
  sendPostComments,
};
