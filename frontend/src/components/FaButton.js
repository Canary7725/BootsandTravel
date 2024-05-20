import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const fabStyle = {
  position: "fixed",
  bottom: 40,
  right: 20,
};

export default function FaButton() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Link to={"/cart"}>
        {" "}
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <ShoppingCartIcon />
        </Fab>
      </Link>
    </Box>
  );
}
