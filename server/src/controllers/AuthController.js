import User from "../models/User.js";
import dns from "dns";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { sendVerificationMail } from "../services/mailer.js";

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

  // console.log(userWithoutExtraFields);

  res.status(200).send({
    message: "Login successful.",
    ...userWithoutExtraFields,
  });
};

export { signup, verifyEmail, login };
