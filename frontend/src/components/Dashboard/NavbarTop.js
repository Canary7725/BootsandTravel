import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { useCookies } from "react-cookie";
import { theme } from "../../assets/Colors";
import Logo from "../../images/Logo.png";
import { useAuth } from "../../Context/AuthContext";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { user } = useAuth();

  const handleCloseUserMenu = (action) => () => {
    if (action === "logout") {
      removeCookie("token");
      navigate("/login");
    } else if (action === "profile") {
      navigate("/profile");
    }
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (anchorElUser && !anchorElUser.contains(event.target)) {
        setAnchorElUser(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorElUser]);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container
        maxWidth="xl"
        sx={{
          color: theme.palette.primary.main,
          bgcolor: theme.palette.secondary.main,
          boxShadow: 0,
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={Logo} className="w-16 h-16 rounded-full" alt="" />
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${user.name}`}
                  src={`http://localhost:4000/images/user/${user.profile_image}`}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu(setting.toLowerCase())}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
