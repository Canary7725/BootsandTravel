const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/secretToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cpassword, phone } = req.body;

  //check existing email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already exists" });
  }
  if (password !== cpassword) {
    res.status(400).json({ message: "Password Mismatch" });
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
    });
    res.status(200).json({
      message: "SignIn Successful",
      success: true,
    });
  } catch (err) {
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
      });
    } else {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { registerUser, loginUser };
