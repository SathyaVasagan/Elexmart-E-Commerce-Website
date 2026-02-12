import express from "express";
import {
  createOrderForUser,
  getMyOrders,
} from "../controllers/orderController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, createOrderForUser);
router.get("/me", authMiddleware, getMyOrders);
export default router;
