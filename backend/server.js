const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

connectDB();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to the API!" })
);

app.post("/payment", async (req, res) => {
  const { orders, token } = req.body;

  if (!orders || !orders.total_amount) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const totalAmountInCents = Math.round(orders.total_amount * 100);
  const idempotencyKey = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: totalAmountInCents,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      { idempotencyKey }
    );

    res.status(200).json(charge);
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`The server could not be started on port ${port}`);
    console.log("Error: " + error);
  }
});
