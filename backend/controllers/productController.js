const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity_available, categories, images } =
    req.body;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    res.status(400).json({ message: "Product already exists" });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
      quantity_available,
      categories,
      images,
    });
    res.status(200).json({
      message: "Product added successfully",
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      success: false,
    });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Couldn't fetch data");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("Couldn't find the product");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity_available, categories, images } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Update the product fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.quantity_available = quantity_available || product.quantity_available;
  product.categories = categories || product.categories;
  product.images = images || product.images;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
