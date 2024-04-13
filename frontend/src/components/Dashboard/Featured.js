import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { theme } from "../../assets/Colors";
import MainButton from "../Button";

import image from "../../images/backup.png";

const Featured = () => {
  return (
    <div>
      <Card sx={{ width: "45vw", my: 4, mx: 4, pb: 2, borderRadius: 3 }}>
        <CardMedia sx={{ height: 480 }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Featured Product Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Featured Product description
          </Typography>
        </CardContent>
        <CardActions>
          <MainButton>Buy Now</MainButton>
          <MainButton>Add to Cart</MainButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Featured;
