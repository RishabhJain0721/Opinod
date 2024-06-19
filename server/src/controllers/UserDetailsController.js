import User from "../models/User.js";
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

      const updatedUser = await User.findOne({ username });

      res.status(200).send({
        message: "Profile updated successfully.",
        token: updatedUser.verificationToken,
        username: updatedUser.username,
        email: updatedUser.email,
        selectedCategories: updatedUser.selectedCategories,
        profilePicture: updatedUser.profilePicture,
        description: updatedUser.description,
        instagram: updatedUser.instagram,
        reddit: updatedUser.reddit,
        linkedin: updatedUser.linkedin,
        twitter: updatedUser.twitter,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).send({ message: "Internal server error." });
    }
  });
};

export { addCategories, updateProfile };
