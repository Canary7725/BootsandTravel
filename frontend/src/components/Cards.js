import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { theme } from "../assets/Colors";

const Cards = (props) => {
  const { product } = props;
  return (
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
        <CardContent
          sx={{
            height: "100%",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          }}
        >
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
              WebkitLineClamp: 2,
              color: theme.palette.secondary.main,
            }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Price: ${product.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Quantity Available: {product.quantity_available}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Categories: {product.categories.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
