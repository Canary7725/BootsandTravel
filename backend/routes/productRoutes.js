const express = require("express");
const uploadProduct = require("../middlewares/uploadProductImage");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post(
  "/createProduct",
  uploadProduct.any("product_images"),
  createProduct
);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.post("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
