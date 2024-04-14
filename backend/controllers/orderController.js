const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { user_id, total_price, shipping_address } = req.body;

  // Retrieve cart items for the user
  const cartItems = await Cart.find({ user_id });

  // Check if the cart is empty
  if (cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const items = cartItems.map((cartItem) => ({
    user_id: cartItem.user_id,
    product: cartItem.product,
    quantity: cartItem.quantity,
  }));
  try {
    // Create the order
    const order = await Order.create({
      user_id,
      total_price,
      items,
      shipping_address,
    });
    res
      .status(201)
      .json({ success: true, data: order, message: "Order Created" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, data: orders });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  res.status(200).json({ success: true, data: order });
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  res.status(200).json({ success: true, data: order });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
