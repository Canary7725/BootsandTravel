import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Import Link component
import { theme } from "../assets/Colors"; //

const pages = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/all" },
  { label: "Men's Wear", path: "/men" },
  { label: "Women's Wear", path: "/women" },
  { label: "MISC", path: "/misc" },
];

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        mt: 2,
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
        <Box sx={{ flexGrow: 0 }}>
          {pages.map((page) => (
            <Link
              key={page.label}
              to={page.path}
              style={{ textDecoration: "none" }}
            >
              <Button
                color="inherit"
                sx={{
                  mx: 4,
                  fontSize: 18,
                }}
              >
                {page.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
