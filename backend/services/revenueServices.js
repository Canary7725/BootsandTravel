const Order = require("../models/orderModel");
const { forecastRevenue } = require("../util/forecast");

const calculateMonthlyRevenue = async () => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const orders = await Order.find({
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
  });
  const revenue = orders.reduce((acc, order) => acc + order.total_price, 0);

  return {
    month: startOfMonth.toLocaleString("default", { month: "long" }),
    revenue,
  };
};

const calculateYearlyRevenue = async () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31);

  const orders = await Order.find({
    createdAt: { $gte: startOfYear, $lte: endOfYear },
  });
  const revenue = orders.reduce((acc, order) => acc + order.total_price, 0);

  return { year: startOfYear.getFullYear(), revenue };
};

const predictFutureRevenue = async () => {
  const prediction = await forecastRevenue();
  console.log(prediction);
  return prediction;
};

module.exports = {
  calculateMonthlyRevenue,
  calculateYearlyRevenue,
  predictFutureRevenue,
};
