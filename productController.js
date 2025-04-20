
import Product from '../models/Product.model.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, price, media, type } = req.body;
  const newProduct = new Product({ name, price, media, type });
  await newProduct.save();
  res.status(201).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
