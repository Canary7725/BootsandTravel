const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/secretToken");
const fs = require("fs");
const { log } = require("console");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  let imageFileName;

  if (req.file) {
    imageFileName = req.file.filename;
  }

  //check existing email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If there's an uploaded image, delete it
    if (imageFileName) {
      fs.unlinkSync(`images/user/${imageFileName}`);
    }
    return res.status(400).json({ message: "Email already exists" });
  }
  if (password !== req.body.cpassword) {
    // If there's an uploaded image, delete it
    if (imageFileName) {
      fs.unlinkSync(`images/user/${imageFileName}`);
    }
    return res.status(400).json({ message: "Password Mismatch" });
  }

  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);
  //create instance
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      is_admin: false,
      profile_image: imageFileName, // Assign image filename directly
    });

    res.status(200).json({
      user,
      message: "SignIn Successful",
      success: true,
    });
  } catch (err) {
    // If there's an uploaded image, delete it
    if (imageFileName) {
      fs.unlinkSync(`images/user/${imageFileName}`);
    }
    res.status(400).json({ message: err.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields Mandatory" });
  }

  try {
    const user = await User.findOne({ email }); // Assuming email is unique

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      return res.status(200).json({
        message: "Login Successful",
        success: true,
        user: user,
      });
    } else {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { registerUser, loginUser, getUserById };
