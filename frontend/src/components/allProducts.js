import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/getProducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 8, mx: 5, fontWeight: "bold" }}
      >
        All Products
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ maxWidth: "100%", m: 5 }}>
              <CardActionArea>
                {product.product_images && product.product_images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:4000/images/product/${product.product_images[0]}`}
                    alt={product.name}
                    sx={{ height: 240 }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/150"
                    alt="Placeholder"
                    sx={{ height: 140 }}
                  />
                )}
                <CardContent sx={{ height: "100%" }}>
                  {/* Link to product details page */}

                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        "&:hover": { color: "red" },
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Display only 2 lines
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity Available: {product.quantity_available}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllProducts;
