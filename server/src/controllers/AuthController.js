import User from "../models/User.js";
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
  console.log(req.body);
  const { username, email, password } = req.body;

  // Check if the email is valid
  if (!isEmailValid(email)) {
    console.log("Email domain does not exist or cannot receive emails.");
    return res.status(401).send({
      message: "Email domain does not exist or cannot receive emails.",
      errorName: "Invalid email",
    });
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("User already exists");
    return res.status(400).send({
      message: "User already exists. Please login.",
      errorName: "User already exists",
    });
  }

  const hashedPassword = hashPassword(password);
  console.log("Password", hashedPassword);

  // Generate a verification token
  const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1d", // Token expires in 1 day
  });

  console.log(verificationToken);

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
  // console.log("Token is :", token);

  try {
    // Verify the token and find the user
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("decoded", decoded);
    const user = await User.findOne({ email: decoded.email });
    if (user) {
      user.isVerified = true;
      await user.save();
      console.log("User verified", user);
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
    console.error(error);
    res.status(500).send({ message: "Email verification failed." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).lean();

  if (!existingUser) {
    // No such user found
    console.log("User does not exist");
    return res.status(400).send({
      message: "User does not exist. Please signup.",
      errorName: "User does not exist",
    });
  }

  if (!existingUser.isVerified) {
    // Unverified user
    console.log("User is not verified");
    return res.status(400).send({
      message: "User is not verified. Please verify.",
      errorName: "User is not verified",
    });
  }

  const checkPassword = bcrypt.compareSync(password, existingUser.password);

  if (!checkPassword) {
    // Incorrect password
    console.log("Password is incorrect");
    return res.status(400).send({
      message: "Password is incorrect. Please try again.",
      errorName: "Password is incorrect",
    });
  }

  // Login successful
  console.log("Login successful");
  // console.log(existingUser);

  const {
    password: pass,
    isVerified,
    createdAt,
    updatedAt,
    ...userWithoutExtraFields
  } = existingUser;

  console.log(userWithoutExtraFields);

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
  console.log(email);
  try {
    const user = await User.findOne({ email });

    const baseUrl = process.env.BASE_URL;
    const resetButtonLink = `${baseUrl}/api/auth/reset-username-page?id=${user._id}`;

    console.log("Reset Button Link : ", resetButtonLink);

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
  console.log(id);

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
  console.log(email);
  try {
    const user = await User.findOne({
      email,
    });

    const baseUrl = process.env.BASE_URL;
    const resetButtonLink = `${baseUrl}/api/auth/reset-password-page?id=${user._id}`;

    console.log("Reset Button Link : ", resetButtonLink);

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
  console.log(id);

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
};
