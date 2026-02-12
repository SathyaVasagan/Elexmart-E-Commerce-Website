import Order from "../models/Order.js";
import { authMiddleware } from "../utils/authMiddleware.js";

export const createOrderForUser = async (req, res) => {
  // Protected
  const { items, amount } = req.body;
  if (!items || !amount)
    return res.status(400).json({ error: "items & amount required" });
  const ord = await Order.create({
    user: req.user._id,
    items,
    amount,
    currency: "INR",
    status: "created",
  });
  res.json({ ok: true, order: ord });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};
