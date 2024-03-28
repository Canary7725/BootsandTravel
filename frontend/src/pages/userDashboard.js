import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import ImageSlider from "../components/ImageSlider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Colors";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        if (!cookies.token) {
          navigate("/login");
          return;
        }
        const { data } = await axios.post(
          "http://localhost:4000/api/users/",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;
        setName(user);

        if (!status) {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error while verifying cookie:", error);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col bg-[#1e1e1e]">
        <NavbarTop />
        <NavbarBottom />
        <ImageSlider />
      </div>
    </ThemeProvider>
  );
};

export default UserDashboard;
