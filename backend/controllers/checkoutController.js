import Razorpay from "razorpay";
import Order from "../models/Order.js";
import dotenv from "dotenv";
dotenv.config();

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// create order
export const createOrder = async (req, res) => {
  // cart items come as [{id, qty}] or with details
  const { items, amount } = req.body;
  if (!items || !amount)
    return res.status(400).json({ error: "items and amount required" });

  // amount is expected in rupees; razorpay expects paise
  const amountPaise = Math.round(amount * 100);
  try {
    const rOrder = await razor.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    });

    const order = await Order.create({
      items,
      amount,
      currency: "INR",
      razorpayOrderId: rOrder.id,
      status: "created",
    });

    res.json({
      ok: true,
      razorpayOrder: rOrder,
      orderId: order._id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("createOrder err", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// webhook to verify payment signature (Razorpay posts here)
export const webhook = async (req, res) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const crypto = await import("crypto");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("hex");
  const signature = req.headers["x-razorpay-signature"];
  if (expected !== signature) {
    console.warn("Webhook signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  const payload = req.body;
  if (
    payload.event === "payment.captured" ||
    payload.event === "payment.authorized"
  ) {
    const payment = payload.payload.payment.entity;
    const orderId = payload.payload.payment.entity.order_id;
    // find our Order by razorpayOrderId
    const ord = await Order.findOne({ razorpayOrderId: orderId });
    if (ord) {
      ord.razorpayPaymentId = payment.id;
      ord.status = "paid";
      await ord.save();
    }
  }
  res.json({ ok: true });
};
