import React, { useState, useEffect } from "react";

import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";

import AllProducts from "../components/allProducts";
import { Box } from "@mui/material";
import { theme } from "../assets/Colors";

function ProductList() {
  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
      <NavbarTop />
      <NavbarBottom />
      <AllProducts />
    </Box>
  );
}

export default ProductList;
