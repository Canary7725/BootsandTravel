const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDB();
const app = express();
const port = process.env.PORT;

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
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`The server could not be started on port ${port}`);
    console.log("Error: " + error);
  }
});
