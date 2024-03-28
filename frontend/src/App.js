import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Test from "./pages/test";
import UserDashboard from "./pages/userDashboard";
import Toast from "./components/Toast";
import { useCookies } from "react-cookie";
import PrimarySearchAppBar from "./pages/test";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f2f3d9",
    },
    secondary: {
      main: "#1e1e1e",
    },
  },
});

export default function App() {
  const cookies = useCookies([]);
  return (
    <div className="application">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/"
            element={
              cookies[0].token ? <UserDashboard /> : <Navigate to="/login" />
            }
          /> */}
          <Route path="/" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
