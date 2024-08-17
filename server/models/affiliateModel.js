const mongoose = require("mongoose");

const affiliateSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  code: { type: String, unique: true, required: true },
  discountPercentage: { type: Number, required: true },
  referrals: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  balance: { type: Number, default: 0 },
  bonusPerReferral: { type: Number },
  phone: { type: Number },
});

const Affiliate = mongoose.model("affiliate", affiliateSchema);

module.exports = Affiliate;
