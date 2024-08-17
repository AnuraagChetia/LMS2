const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  cartTotal: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
