import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";
import Footer from "../components/Dashboard/Footer";
import FaButton from "../components/FaButton";
import MainButton from "../components/Button";
import { Typography } from "@mui/material";
import Cards from "../components/Cards";

const Test = () => {
  return (
    <div className="bg-secondary">
      <NavbarTop />
      <NavbarBottom />
      <Footer />
      <FaButton />
      <MainButton>Hello</MainButton>
      <Typography>Hello</Typography>
    </div>
  );
};

export default Test;
