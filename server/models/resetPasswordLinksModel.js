const mongoose = require("mongoose");

const resetPasswordLinksSchema = mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ResetPasswordLinks = mongoose.model(
  "resetpasswordlinks",
  resetPasswordLinksSchema
);

module.exports = ResetPasswordLinks;
