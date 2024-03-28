const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
    },
    description: {
      type: String,
      required: [true, "Product description required"],
    },
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    quantity_available: {
      type: Number,
      required: [true, "Quantity available required"],
    },
    categories: {
      type: [String],
      required: [true, "Product categories required"],
    },
    images: {
      type: [String],
      required: [true, "Product images required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
