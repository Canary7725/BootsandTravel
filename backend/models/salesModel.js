const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  order_id: String,
  date: Date,
  total_sales_amount: Number,
});

module.exports = mongoose.model("Sales", SalesSchema);
