import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./assets/Colors";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import ProductList from "./pages/productPage";
import Cart from "./pages/cart";
import ProductDetails from "./pages/productDetails";
import FaButton from "./components/FaButton";
import Test from "./pages/test";
import AdminHome from "./pages/Admin/adminHome";
import ItemList from "./pages/Admin/itemList";

export default function App() {
  const cookies = useCookies([]);
  return (
    <div className="application p-0">
      <ThemeProvider theme={theme}>
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
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/all" element={<ProductList category="all" />} />
            <Route path="/men" element={<ProductList category="men" />} />
            <Route path="/women" element={<ProductList category="women" />} />
            <Route path="/misc" element={<ProductList category="misc" />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/itemList" element={<ItemList />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
