const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMonthlyRevenue,
  getYearlyRevenue,
  getFutureRevenue,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);
router.get("/revenue/monthly", getMonthlyRevenue);
router.get("/revenue/yearly", getYearlyRevenue);
router.get("/revenue/future", getFutureRevenue);

module.exports = router;
