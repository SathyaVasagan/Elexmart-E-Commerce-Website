import express from "express";
import { createOrder, webhook } from "../controllers/checkoutController.js";
const router = express.Router();

router.post("/create-order", createOrder);

// webhook endpoint (Razorpay will POST here)
router.post("/webhook", webhook);

export default router;
