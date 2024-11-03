import User from "../models/User.js";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";
import Feedback from "../models/Feedback.js";
import Recent from "../models/Recent.js";
import dns from "dns";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { sendVerificationMail } from "../services/mailer.js";
import { sendResetMail } from "../services/resetMailer.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const isEmailValid = async (email) => {
  const emailParts = email.split("@");
  const domain = emailParts[1];
  const addresses = await dns.promises.resolveMx(domain);
  if (addresses && addresses.length !== 0) return true;
  else return false;
};

const hashPassword = (pass) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(pass, saltRounds);
  return hash;
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email is valid
  if (!isEmailValid(email)) {
    return res.status(401).send({
      message: "Email domain does not exist or cannot receive emails.",
      errorName: "Invalid email",
    });
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isActive) {
    return res.status(400).send({
      message: "User already exists. Please login.",
      errorName: "User already exists",
    });
  }
  // Check if a user with the same username already exists
  const existingUserName = await User.findOne({ username });
  if (existingUserName) {
    return res.status(400).send({
      message: "User with this username already exists. Try something else.",
      errorName: "Username taken. Try something else.",
    });
  }

  const hashedPassword = hashPassword(password);

  // Generate a verification token
  const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Create a new user with the verification token
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
  });

  await newUser.save();

  try {
    const status = sendVerificationMail(verificationToken, email);
    if (!status) {
      throw new Error("Email verification failed");
    }
    res.send({
      message: "Signup successful. Please check your email for verification.",
    });
  } catch (err) {
    res.status(500).send({ message: "Signup failed. Please try again later." });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token and find the user
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (user) {
      user.isVerified = true;
      await user.save();
      res.status(200).send({
        message: "Email verification successful.",
        token: user.verificationToken,
        username: user.username,
        email: user.email,
        selectedCategories: user.selectedCategories,
        profilePicture: user.profilePicture,
        description: user.description,
        instagram: user.instagram,
        reddit: user.reddit,
        linkedin: user.linkedin,
        twitter: user.twitter,
      });
    } else {
      res
        .status(404)
        .send({ message: "Invalid token. Email verification failed." });
    }
  } catch (error) {
    res.status(500).send({ message: "Email verification failed." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).lean();

  if (!existingUser || !existingUser.isActive) {
    // No such user found
    return res.status(400).send({
      message: "User does not exist. Please signup.",
      errorName: "User does not exist",
    });
  }

  if (!existingUser.isVerified) {
    // Unverified user
    return res.status(400).send({
      message: "User is not verified. Please verify.",
      errorName: "User is not verified",
    });
  }

  const checkPassword = bcrypt.compareSync(password, existingUser.password);

  if (!checkPassword) {
    // Incorrect password
    return res.status(400).send({
      message: "Password is incorrect. Please try again.",
      errorName: "Password is incorrect",
    });
  }

  // Login successful

  const {
    password: pass,
    isVerified,
    createdAt,
    updatedAt,
    ...userWithoutExtraFields
  } = existingUser;

  res.status(200).send({
    message: "Login successful.",
    ...userWithoutExtraFields,
  });
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  let message;

  try {
    if (username === process.env.ADMIN_USERNAME) {
      const checkPassword = bcrypt.compareSync(
        password,
        process.env.ADMIN_PASS
      );
      if (checkPassword) {
        message = "Admin login successful";
      } else {
        message = "Wrong credentials !";
      }
    } else {
      message = "Wrong credentials !";
    }

    res.status(200).send({ message, username });
  } catch (error) {
    res.status(400).send("Admin login failed !");
  }
};

const forgotUsername = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    const serverUrl = process.env.SERVER_URL;
    const resetButtonLink = `${serverUrl}/api/auth/reset-username-page?id=${user._id}`;

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Reset your username",
      html: `
          <div style="font-family: Arial, sans-serif;">
            <p style="color: #666;">Please reset your username by clicking the link below:</p>
            <p><a href="${resetButtonLink}" target="_blank" style="display: inline-block; background-color: #D32F2F; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Username</a></p>
            <p style="color: #666;">Thank you!</p>
          </div>
        `,
    };

    await sendResetMail(email, mailOptions);

    res.status(200).send({
      status: 200,
      message: "Username reset link sent to your email.",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Username reset failed. Please try again later.",
    });
  }
};

const resetUsernamePage = async (req, res) => {
  const { id } = req.query;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      res.sendFile(path.join(__dirname, "..", "public", "resetUsername.html"));
    } else {
      res.status(400).send({
        status: 400,
        message: "Invalid Id. Password reset failed.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Password reset failed.",
    });
  }
};

const resetUsername = async (req, res) => {
  const { id, username } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    await Comment.updateMany(
      { author: user.username },
      { $set: { author: username } }
    );
    await CommunityPost.updateMany(
      { author: user.username },
      { $set: { author: username } }
    );
    await Feedback.updateMany(
      { username: username },
      { $set: { username: user.username } }
    );
    const filter = { "all.author": user.username }; // Filter to find the document containing the user
    // const update = { $set: { "all.$.username": username } }; // Update operation using positional $ operator
    // const options = { new: true }; // Options: return the updated document
    // const result = await Recent.findOne(filter);
    // const result = await Recent.findOneAndUpdate(filter, update, options);

    await Recent.updateOne(
      {},
      {
        $set: {
          "all.$[elem].author": username,
        },
      },
      {
        arrayFilters: [{ "elem.author": user.username }],
      }
    );
    await Recent.updateOne(
      {},
      {
        $set: {
          "all.$[elem].username": username,
        },
      },
      {
        arrayFilters: [{ "elem.username": user.username }],
      }
    );

    if (user) {
      user.username = username;
      await user.save();
      res.status(200).send({
        status: 200,
        message: "Username reset successful.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Username reset failed.",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    const serverUrl = process.env.SERVER_URL;
    const resetButtonLink = `${serverUrl}/api/auth/reset-password-page?id=${user._id}`;

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
          <div style="font-family: Arial, sans-serif;">
            <p style="color: #666;">Please reset your password by clicking the link below:</p>
            <p><a href="${resetButtonLink}" target="_blank" style="display: inline-block; background-color: #D32F2F; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a></p>
            <p style="color: #666;">Thank you!</p>
          </div>
        `,
    };

    await sendResetMail(email, mailOptions);

    res.status(200).send({
      status: 200,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Password reset failed. Please try again later.",
    });
  }
};

const resetPasswordPage = async (req, res) => {
  const { id } = req.query;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      res.sendFile(path.join(__dirname, "..", "public", "resetPassword.html"));
    } else {
      res.status(400).send({
        status: 400,
        message: "Invalid Id. Password reset failed.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Password reset failed.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (user) {
      user.password = hashPassword(password);
      await user.save();
      res.status(200).send({
        status: 200,
        message: "Password reset successful.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Password reset failed.",
    });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;

  console.log(email);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    user.isActive = false;
    await user.save();
    if (user) {
      res.status(200).send({
        status: 200,
        message: "User deleted successfully.",
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "User not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "User deletion failed.",
    });
  }
};

export {
  signup,
  verifyEmail,
  login,
  adminLogin,
  forgotUsername,
  resetUsernamePage,
  resetUsername,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
  deleteUser,
};
