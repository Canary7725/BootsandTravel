const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

module.exports = router;
