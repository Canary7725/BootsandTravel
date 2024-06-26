import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Typography from "@mui/material/Typography";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import ImageSlider from "../components/Dashboard/ImageSlider";
import Featured from "../components/Dashboard/Featured";
import BrandSlider from "../components/Dashboard/BrandSlider";
import Footer from "../components/Footer";
import { useAuth } from "../Context/AuthContext";
import { Button } from "@mui/material";
import FaButton from "../components/FaButton";

import image1 from "../images/Featured1.png";
import image2 from "../images/Featured2.png";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    setName(user ? user.name : ""); // Check if user is not null before accessing name
  }, [user]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-secondary overflow-x-hidden">
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
        <Featured image={image1} />
        <Featured image={image2} />
      </div>
      <BrandSlider />
      <FaButton />
      <Footer />
    </div>
  );
};

export default Home;
