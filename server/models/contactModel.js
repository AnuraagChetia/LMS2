const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    subject: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
