import Post from "../models/Post.js";
import CommunityPost from "../models/CommunityPost.js";
import User from "../models/User.js";

const search = async (req, res) => {
  const { searchText } = req.body;
  try {
    const posts = await Post.find(
      { title: { $regex: searchText, $options: "i" } } // 'i' makes the search case-insensitive
    ).lean();

    const communityPosts = await CommunityPost.find({
      title: { $regex: searchText, $options: "i" },
    }).lean();

    for (const post of communityPosts) {
      const pp = await User.findOne(
        { username: post.author },
        { profilePicture: 1, _id: 0 }
      ).lean();
      post.profilePicture = pp.profilePicture;
    }

    res.send({ posts, communityPosts });
  } catch (error) {
    console.error("Error searching for posts:", error);
  }
};

export { search };
