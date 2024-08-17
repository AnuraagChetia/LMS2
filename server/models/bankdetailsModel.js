const mongoose = require("mongoose");

const bankDetailsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc: { type: String, required: true },
  bankName: { type: String, required: true },
  accountType: { type: String, enum: ["current", "savings"], required: true },
  upi: { type: String },
});

const BankDetails = mongoose.model("BankDetails", bankDetailsSchema);

module.exports = BankDetails;
