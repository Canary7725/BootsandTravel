const express = require("express");
const dotenv = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const UserVerification = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadUserImage");

const {
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", upload.single("profile_image"), registerUser);
router.post("/login", loginUser);
router.post("/", UserVerification);
router.get("/getUserById/:id", getUserById);

module.exports = router;
