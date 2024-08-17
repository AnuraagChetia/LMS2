const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
  specialization: { type: String },
  bio: { type: String },
  education: { type: String },
  experience: { type: String },
  ratings: { type: Number, min: 1, max: 5 },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  ],
  totalSales: { type: Number, default: 0 },
});

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;
