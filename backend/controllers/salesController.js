const asyncHandler = require("express-async-handler");
const Sales = require("../models/salesModel");

const createSales = asyncHandler(async (req, res) => {
  const { orderId, date, total_price } = req.body;

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
