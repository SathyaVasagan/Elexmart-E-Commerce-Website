import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import path from "path";

import paymentRoutes from "./routes/payment.js"; // add this
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import checkoutRoutes from "./routes/checkout.js";
import orderRoutes from "./routes/orders.js";
import newsletterRoutes from "./routes/newsletter.js";
import "./config/passport.js"; // passport strategies

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connect error", err);
    process.exit(1);
  });

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      // keep raw body for Razorpay webhook verification
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Session (needed for passport OAuth flow)
app.use(
  session({
    secret: process.env.JWT_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set true when using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.use("/api/payment", paymentRoutes); // add this line

// Health
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date() }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
