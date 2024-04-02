const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number required"],
    },
    is_admin: {
      type: Boolean,
    },
    profile_image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
