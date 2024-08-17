const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" }, // the user who is making the payment
  orders: [{ type: mongoose.Types.ObjectId, ref: "course" }],
  amount: { type: Number },
  paymentId: { type: String },
  orderId: { type: String },
  status: { type: String, enum: ["SUCCESS", "PENDING", "FAILED"] },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
