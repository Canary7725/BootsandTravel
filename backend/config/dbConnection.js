const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // MongoDB connection URI
    const dbName = "ecommerce"; // Specify your database name here

    // Connect to the MongoDB database
    const connect = await mongoose.connect(uri, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      "Connected to MongoDB",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
