const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const addItemToCart = asyncHandler(async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log(product_id);

  const productItem = await Product.findOne({ _id: product_id });
  console.log(productItem);
  if (!productItem) {
    return res
      .status(400)
      .json({ success: false, error: "Product Doesn't exists" });
  }

  const cartItem = await Cart.create({
    user_id,
    product: productItem,
    quantity,
  });
  res.status(201).json({ success: true, data: cartItem });
});

const getCartItems = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const cartItems = await Cart.find({ user_id });
  res.status(200).json({ success: true, data: cartItems });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const updatedCartItem = await Cart.findByIdAndUpdate(
    id,
    { quantity },
    { new: true, runValidators: true }
  );
  if (!updatedCartItem) {
    return res
      .status(404)
      .json({ success: false, error: "Cart item not found" });
  }
  res.status(200).json({ success: true, data: updatedCartItem });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cartItem = await Cart.findByIdAndDelete(id);
  if (!cartItem) {
    return res
      .status(404)
      .json({ success: false, error: "Cart item not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  addItemToCart,
  getCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
};
