import Community from "../models/Community.js";
import CommunityPost from "../models/CommunityPost.js";

const topCommunityPosts = async (id, numberOfPosts) => {
  try {
    const topPosts = await CommunityPost.find({})
      // .sort({ upvotes: -1 })
      .limit(numberOfPosts);
    console.log(topPosts);
  } catch (error) {
    console.log(error);
  }
  return topPosts;
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
    console.log(topPosts);
    res.status(200).send({ subcategories });
  } catch (error) {
    res.status(404).send(error);
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
  console.log(newPost);
  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { sendCommunities, sendCommunityData, addPost };
