import Community from "../models/Community.js";
import CommunityPost from "../models/CommunityPost.js";
import User from "../models/User.js";

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
    const community = await Community.findById(id, { subCategories: 1 }).lean();
    const subcategories = community.subCategories;
    const topPosts = await topCommunityPosts(id, 2);
    res.status(200).send({ subcategories, topPosts });
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
  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { sendCommunities, sendCommunityData, addPost, sendTopPosts };
