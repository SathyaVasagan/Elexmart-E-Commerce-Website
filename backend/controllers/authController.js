import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/authMiddleware.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already in use" });
  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    provider: "local",
  });
  const token = generateToken(user);
  res.json({
    ok: true,
    token,
    user: { id: user._id, email: user.email, name: user.name },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  if (!user.passwordHash)
    return res
      .status(400)
      .json({ error: "Account uses social login. Use social sign-in." });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });
  const token = generateToken(user);
  res.json({
    ok: true,
    token,
    user: { id: user._id, email: user.email, name: user.name },
  });
};

// OAuth callback will redirect to frontend with a JWT in query param
export const oauthRedirect = async (req, res) => {
  // passport sets req.user
  if (!req.user) return res.status(400).send("OAuth failed");
  const token = generateToken(req.user);
  const redirect = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/auth-success?token=${token}`;
  return res.redirect(redirect);
};
