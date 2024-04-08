const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity_available, categories } = req.body;

  // Check if files are uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Extract filenames from uploaded files
  const images = req.files.map((file) => file.filename);

  try {
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      // Delete uploaded images if product already exists
      images.forEach((filename) => {
        fs.unlinkSync(`images/product/${filename}`);
      });
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create new product with uploaded images
    const product = await Product.create({
      name,
      description,
      price,
      quantity_available,
      categories,
      product_images: images,
    });

    res.status(200).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    // Delete uploaded images if error occurs
    images.forEach((filename) => {
      fs.unlinkSync(`images/product/${filename}`);
    });
    res.status(400).json({
      message: "Error adding product",
      success: false,
      error: error.message,
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
