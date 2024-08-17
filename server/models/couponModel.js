const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntill: {
      type: Date,
      required: true,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      default: null, //null if no limit on discount amount
    },
    maxUses: {
      type: Number,
      default: null, // Unlimited uses if not specified
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
    termsAndConditions: {
      type: [{ type: String }], // Array of strings
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "deactivated"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
