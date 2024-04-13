import React, { useContext } from "react";
import { ProductsContext } from "../Context/productsContext";
import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";
import { theme } from "../assets/Colors";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Cards from "../components/Cards";
import FaButton from "../components/FaButton";

function ProductList(props) {
  const { category } = props;
  const products = useContext(ProductsContext);

  // Filter products based on category
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) =>
          product.categories.some((cat) => cat === category)
        );

  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
      <NavbarTop />
      <NavbarBottom />

      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 8, mx: 5, fontWeight: "bold" }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={4}>
              <Cards product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <FaButton />
    </Box>
  );
}

export default ProductList;
