import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Community from "../models/Community.js";
import CommunityPost from "../models/CommunityPost.js";
import Post from "../models/Post.js";
import Recent from "../models/Recent.js";
import multer from "multer";
import NewsletterEmail from "../models/NewsletterEmail.js";
import "../services/userCleaner.js";

// Create a multer instance with the storage configuration
const upload = multer({
  limits: {
    fileSize: 10000 * 1024, // 10MB limit for each file
  },
});

const addCategories = async (req, res) => {
  const { username, categories } = req.body;
  const user = await User.findOne({ username });

  //converting object to array of selected categories
  const categoriesArray = Object.keys(categories).filter(
    (category) => categories[category] === true
  );
  user.selectedCategories = categoriesArray;

  await user.save();

  res.send({ message: "Categories added successfully." });
};

const updateProfile = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: "Image upload failed." });
    }

    const { username, description, instagram, reddit, linkedin, twitter } =
      req.body;
    const image = req.file;

    try {
      const user = await User.findOne({ username });

      user.description = description;
      user.instagram = instagram;
      user.reddit = reddit;
      user.linkedin = linkedin;
      user.twitter = twitter;
      if (image) {
        user.profilePicture = image;
      }
      await user.save();

      const updatedUser = await User.findOne({ username }).lean();

      const {
        password: pass,
        isVerified,
        createdAt,
        updatedAt,
        ...userWithoutExtraFields
      } = updatedUser;

      res.status(200).send({
        message: "Profile updated successfully.",
        ...userWithoutExtraFields,
      });
    } catch (error) {
      res.status(500).send({ message: "Internal server error." });
    }
  });
};

const joinCommunity = async (req, res) => {
  const { username, communityId } = req.body;
  try {
    const user = await User.findOne({ username });
    user.joinedCommunities.push(communityId);
    await user.save();
    const community = await Community.findById(communityId);
    community.subscriberCount++;
    await community.save();
    res
      .status(200)
      .send({ "Updated communities array": user.joinedCommunities });
  } catch (error) {
    res.status(500).send({ Message: "Internal server error." });
  }
};

const leaveCommunity = async (req, res) => {
  const { username, communityId } = req.body;
  try {
    const user = await User.findOne({ username });
    user.joinedCommunities = user.joinedCommunities.filter(
      (id) => id !== communityId
    );
    await user.save();
    const community = await Community.findById(communityId);
    community.subscriberCount--;
    await community.save();
    res
      .status(200)
      .send({ "Updated communities array": user.joinedCommunities });
  } catch (error) {
    res.status(500).send({ Message: "Internal server error." });
  }
};

const sendRecent = async (req, res) => {
  const { username, number } = req.body;
  let recent;
  try {
    if (username) {
      const array = await Recent.aggregate([
        {
          $project: {
            all: {
              $filter: {
                input: "$all",
                as: "item",
                cond: {
                  $or: [
                    { $eq: ["$$item.username", username] },
                    { $eq: ["$$item.author", username] },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            all: { $slice: ["$all", number ? -number : { $size: "$all" }] },
          },
        },
      ]);
      recent = array[0];
    } else recent = await Recent.findOne({}, { all: { $slice: -5 } });

    let arr = [];
    for (const item of recent.all) {
      if (item.type === "comment") {
        const post = await Post.findOne(
          { _id: item.postId },
          { title: 1 }
        ).lean();
        if (post) {
          item.title = post.title;
          arr.push(item);
        }
      } else if (item.type === "communityComment") {
        const cPost = await CommunityPost.findOne(
          { _id: item.postId },
          { title: 1 }
        ).lean();
        if (cPost) {
          item.title = cPost.title;
          arr.push(item);
        }
      } else if (item.type === "reply") {
        const post = await Post.findOne(
          { _id: item.postId },
          { title: 1 }
        ).lean();
        if (post) {
          item.title = post.title;
          arr.push(item);
        }
      } else if (item.type === "communityReply") {
        const cPost = await CommunityPost.findOne(
          { _id: item.postId },
          { title: 1 }
        ).lean();
        if (cPost) {
          item.title = cPost.title;
          arr.push(item);
        }
      } else if (item.type === "post") {
        const cPost = await CommunityPost.findOne(
          { _id: item.postId },
          { title: 1 }
        ).lean();
        if (cPost) {
          item.title = cPost.title;
          arr.push(item);
        }
      }
    }
    res.status(200).send(arr?.reverse());
  } catch (error) {
    res.status(400).send({ Message: "Failed to fetch" });
  }
};

const sendUserDetails = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ username: name });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ Message: "Failed to fetch" });
  }
};

const sendUserPosts = async (req, res) => {
  const { name } = req.body;
  try {
    const posts = await CommunityPost.find({ author: name }).sort({
      createdAt: -1,
    });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send("Failed to fetch posts");
  }
};

const sendUserComments = async (req, res) => {
  const { name } = req.body;
  try {
    const comments = await Comment.find({ author: name }).sort({
      createdAt: -1,
    });
    // .sort({ createdAt: -1 })
    // .limit(20);
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).send("Failed to fetch comments");
  }
};

const followUser = async (req, res) => {
  const { username, name } = req.body;
  try {
    await User.updateOne(
      { username: name },
      { $push: { followers: username } }
    );
    await User.updateOne({ username }, { $push: { following: name } });
    res.status(200).send("Followed User");
  } catch (error) {
    res.status(400).send("Failed to follow");
  }
};

const unfollowUser = async (req, res) => {
  const { username, name } = req.body;
  try {
    await User.updateOne(
      { username: name },
      { $pull: { followers: username } }
    );
    await User.updateOne({ username }, { $pull: { following: name } });
    res.status(200).send("Unfollowed User");
  } catch (error) {
    res.status(400).send("Failed to unfollow");
  }
};

const sendBadges = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username }, { badges: 1 });
    res.status(200).send(user.badges);
  } catch (error) {
    res.status(400).send("Failed to unfollow");
  }
};

const updateBadges = async (req, res) => {
  const { achievements, username } = req.body;
  try {
    const user = await User.findOne({ username }, { badges: 1 });
    user.badges = achievements;
    await user.save();
    res.status(200).send("Badges updated successfully");
  } catch (error) {
    res.status(400).send("Badge updation failed");
  }
};

const newsletterSignup = async (req, res) => {
  const { email } = req.body;
  try {
    const user = new NewsletterEmail({ email });
    await user.save();
    res.status(200).send("Subscribed successfully");
  } catch (error) {
    res.status(400).send("Subscription failed");
  }
};

const newsletterEmails = async (req, res) => {
  try {
    const emails = await NewsletterEmail.find();
    res.status(200).send(emails);
  } catch (error) {
    res.status(400).send("Failed to fetch emails");
  }
};

export {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
  sendRecent,
  sendUserDetails,
  sendUserPosts,
  sendUserComments,
  followUser,
  unfollowUser,
  sendBadges,
  updateBadges,
  newsletterSignup,
  newsletterEmails,
};
