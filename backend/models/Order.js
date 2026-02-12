import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productId: Number,
    title: String,
    price: Number,
    qty: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  items: [itemSchema],
  amount: { type: Number }, // in paise or rupees as you choose; we'll store rupees
  currency: { type: String, default: "INR" },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: {
    type: String,
    enum: ["created", "paid", "failed", "captured"],
    default: "created",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
