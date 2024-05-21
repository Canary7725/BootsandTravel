import axios from "axios";

export const getMonthlyRevenue = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/api/order/revenue/monthly"
  );
  return data;
};

export const getYearlyRevenue = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/api/order/revenue/yearly"
  );
  return data;
};

export const getFutureRevenue = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/api/order/revenue/future"
  );
  return data;
};
