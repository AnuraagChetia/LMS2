const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    headline: { type: String, required: true },
    description: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: { type: Number, default: 0 },
    duration: { type: Number, required: true }, // Duration in minutes or hours
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "module" }],
    category: {
      type: String,
      required: true,
      enum: [
        "Development",
        "Business",
        "Finance & Acounting",
        "IT & Software",
        "Office Productivity",
        "Personal Development",
        "Design",
        "Marketing",
        "Lifestyle",
        "Photography & Video",
        "Health & Fitness",
        "Music",
        "Teaching & Academics",
      ],
    },
    tags: [{ type: String }],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          unique: false,
        },
        ratings: { type: Number },
        comment: { type: String },
      },
    ],
    QnA: [
      {
        question: {
          sender: { type: String },
          comment: { type: String },
          time: { type: Date },
        },
        replies: [
          {
            sender: { type: String },
            comment: { type: String },
            time: { type: Date },
          },
        ], // add time of comment later
      },
    ],
    language: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "deactivated",
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("course", courseSchema);

module.exports = Course;
