import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Colors";
import Typography from "@mui/material/Typography";

import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";
import ImageSlider from "../components/Dashboard/ImageSlider";
import Featured from "../components/Dashboard/Featured";
const UserDashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col bg-secondary">
        <NavbarTop />
        <NavbarBottom />
        <ImageSlider />
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 8, mx: 4, fontWeight: "bold" }}
        >
          Featured
        </Typography>
        <div className="flex flex-row justify-between">
          <Featured />
          <Featured />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserDashboard;
