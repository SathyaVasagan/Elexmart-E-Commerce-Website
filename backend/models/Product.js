import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  brand: String,
  category: String,
  price: Number,
  rating: Number,
  stock: Number,
  description: String,
  image: String,
});

export default mongoose.model("Product", productSchema);
