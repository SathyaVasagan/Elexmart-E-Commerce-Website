// very simple: store in DB or just log
export const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  // In production: store in collection and/or send to mail provider
  console.log("Newsletter subscribe:", email);
  res.json({ ok: true });
};
