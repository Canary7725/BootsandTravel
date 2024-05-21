const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const {
  calculateMonthlyRevenue,
  calculateYearlyRevenue,
  predictFutureRevenue,
} = require("../services/revenueServices");

const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { user_id, total_price, shipping_address } = req.body;

  // Retrieve cart items for the user
  const cartItems = await Cart.find({ user_id });

  // Check if the cart is empty
  if (cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const user_name = await User.findById(user_id);
  console.log(user_name);

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
      user_name: user_name.name,
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

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, data: order, message: "Updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating order status" });
  }
};

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }
  res.status(200).json({ success: true, data: {} });
});

const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await calculateMonthlyRevenue();
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getYearlyRevenue = async (req, res) => {
  try {
    const revenue = await calculateYearlyRevenue();
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFutureRevenue = async (req, res) => {
  try {
    const revenue = await predictFutureRevenue();
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMonthlyRevenue,
  getYearlyRevenue,
  getFutureRevenue,
};
