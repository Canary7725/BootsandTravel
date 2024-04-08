import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./assets/Colors";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import ShopCategory from "./pages/shopCategory";
import ProductPage from "./pages/productPage";
import Cart from "./pages/cart";
import AddProduct from "./pages/addProduct";
import ProductDetails from "./pages/productDetails";
import AllProducts from "./components/allProducts";

export default function App() {
  const cookies = useCookies([]);
  return (
    <div className="application">
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
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/all" element={<ProductPage category="all" />} />
            <Route path="/men" element={<ProductPage category="men" />} />
            <Route path="/women" element={<ProductPage category="women" />} />
            <Route path="/misc" element={<ProductPage category="misc" />} />

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
