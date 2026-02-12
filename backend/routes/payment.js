// routes/payment.js
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();  // 🔹 Must be here

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/order", async (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: "Amount is required" });

  try {
    const options = {
      amount: amount, // in paise
      currency: "INR",
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order", error: err });
  }
});

// Verify payment
router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// Optional: Webhook endpoint
router.post("/webhook", (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const body = req.rawBody; // body-parser raw buffer

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (signature === expectedSignature) {
    // Handle webhook events here
    const event = req.body;
    console.log("Razorpay webhook received:", event.event);
    // You can update order status in DB based on event
    return res.json({ ok: true });
  } else {
    return res
      .status(400)
      .json({ ok: false, error: "Invalid webhook signature" });
  }
});

export default router;
