import express from "express";
import passport from "passport";
import {
  register,
  login,
  oauthRedirect,
} from "../controllers/authController.js";

const router = express.Router();

// Local
router.post("/register", register);
router.post("/login", login);

// OAuth initiation
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// OAuth callback: passport will call strategy and then call oauthRedirect
router.get(
  "/oauth/callback",
  passport.authenticate(["google", "github"], {
    failureRedirect: "/auth/failure",
    session: true,
  }),
  oauthRedirect
);

export default router;
