import User from "../models/User.js";
import Community from "../models/Community.js";
import Recent from "../models/Recent.js";
import multer from "multer";

// Create a multer instance with the storage configuration
const upload = multer({
  limits: {
    fileSize: 500 * 1024, // 500KB limit for each file
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
      console.log(err);
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
      console.error("Error updating profile:", error);
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
  const { username } = req.body;
  console.log(username);
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
      ]);
      recent = array[0];
    } else recent = await Recent.findOne({}, { all: { $slice: -5 } });
    res.status(200).send(recent.all.reverse());
  } catch (error) {
    res.status(400).send({ Message: "Failed to fetch" });
  }
};

export {
  addCategories,
  updateProfile,
  joinCommunity,
  leaveCommunity,
  sendRecent,
};
