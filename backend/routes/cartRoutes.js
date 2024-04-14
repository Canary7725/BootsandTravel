const express = require("express");

const {
  addItemToCart,
  getCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/addItemToCart", addItemToCart);
router.get("/getCartItems/:user_id", getCartItems);
router.post("/updateCartItemQuantity/:id", updateCartItemQuantity);
router.delete("/removeItemFromCart/:id", removeItemFromCart);

module.exports = router;
