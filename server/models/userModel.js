const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    headline: { type: String },
    address: { type: String },
    avatar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone: { type: Number, required: true },
    role: {
      type: String,
      enum: ["teacher", "student", "admin"],
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    website: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },

    status: { type: String, enum: ["active", "suspended"], default: "active" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
