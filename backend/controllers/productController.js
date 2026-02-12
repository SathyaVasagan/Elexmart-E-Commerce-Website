import Product from "../models/Product.js";

// For simplicity: expose full list and find by id
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  // id may be numeric id or mongo _id; try both
  let p = await Product.findOne({ id: Number(id) });
  if (!p) p = await Product.findById(id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
};
