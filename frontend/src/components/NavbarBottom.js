import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const pages = ["Home", "Shop", "Boots", "Men's Wear", "Women's Wear", "MISC"];

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{ mt: 8, maxWidth: "70vw", mx: "auto", fontFamily: "" }}
    >
      <Container className="bg-primary text-secondary font-bolder">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            {pages.map((page) => (
              <Button key={page} color="inherit" sx={{ mx: 4 }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
