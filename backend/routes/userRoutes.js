const express = require("express");
const dotenv = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const UserVerification = require("../middlewares/authMiddleware");

const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", UserVerification);

module.exports = router;
