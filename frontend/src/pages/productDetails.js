import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "@mui/material/Typography";

import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";
import { theme } from "../assets/Colors";
import Footer from "../components/Dashboard/Footer";
import MainButton from "../components/Button";
import BreadCrumb from "../components/Breadcrumb";
import { ProductsContext } from "../Context/productsContext";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useContext(ProductsContext);
  const product = products.find(
    (product) => parseInt(product._id) === parseInt(id)
  );
  if (!product) {
    return <div>Loading...</div>;
  }

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
      }}
    >
      <NavbarTop />
      <NavbarBottom />
      {/* <BreadCrumb product={product} /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          m: 5,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "60vh",
            width: "36vw",
            mr: 5,
            border: "6px solid #1e1e1e",
            overflow: "hidden", // Ensure images don't overflow
          }}
        >
          <Slider {...settings}>
            {product.product_images.map((image, index) => (
              <div key={index} style={{ height: "100%", width: "100%" }}>
                <img
                  src={`http://localhost:4000/images/product/${image}`}
                  alt={`Image ${index}`}
                  style={{
                    height: "60vh",
                    width: "36vw",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
        <Box
          sx={{
            height: "60vh",
            width: "50vw",
            Color: theme.palette.secondary.main,
          }}
        >
          <Typography
            sx={{
              typography: "h1",
            }}
          >
            {product.name}
          </Typography>
          <Typography>{product.description}</Typography>
        </Box>
      </Box>
      <Box sx={{ ml: "43.65%" }}>
        <Typography>In Stock: {product.quantity_available}</Typography>
        <Typography sx={{ typography: "h3" }}>Rs {product.price}</Typography>
        <MainButton>Add to Cart</MainButton>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetails;
