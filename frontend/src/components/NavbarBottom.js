import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; // Import Typography
import { theme } from "../assets/Colors"; // Import theme

const pages = ["Home", "Shop", "Boots", "Men's Wear", "Women's Wear", "MISC"];

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        mt: 12,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: "100vw",
          mx: "auto",
          fontWeight: "bold",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ flexGrow: 0 }}>
          {pages.map((page) => (
            <Button key={page} color="inherit" sx={{ mx: 4, fontSize: 18 }}>
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
