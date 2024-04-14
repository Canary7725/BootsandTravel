import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavbarTop from "../components/Dashboard/NavbarTop";
import NavbarBottom from "../components/Dashboard/NavbarBottom";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Context/AuthContext";
import MainButton from "../components/Button";
import { theme } from "../assets/Colors";
import Footer from "../components/Dashboard/Footer";

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const user_id = user ? user._id : null;

  useEffect(() => {
    // Fetch cart data based on user._id
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/cart/getCartItems/${user_id}`
        );
        if (response.ok) {
          const cartData = await response.json();
          setCart(cartData);
        } else {
          // Handle error
          console.error("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (user && user._id) {
      fetchCartData();
    }
  }, [user]);

  const cartItems = cart ? cart : null;

  let totalPrice = 0;

  for (const item of cartItems) {
    totalPrice += item.product.price * item.quantity;
  }

  return (
    <Box sx={{ bgcolor: theme.palette.secondary.main, overflow: "hidden" }}>
      <NavbarTop />
      <NavbarBottom />
      <Grid container spacing={2} sx={{ my: 6 }}>
        <Grid xs={0} md={0} lg={1}></Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography variant="h4" sx={{ mx: 3, my: 3 }}>
            {" "}
            My Cart{" "}
          </Typography>

          {cartItems &&
            cartItems.map((item) => (
              <Grid
                container
                spacing={2}
                key={item._id}
                sx={{ display: "flex", py: 3, mx: 3 }}
              >
                <Grid lg={2} md={4} xs={4}>
                  <img
                    src={`http://localhost:4000/images/product/${item.product.product_images[0]}`}
                    className="h-32 w-32"
                  />
                </Grid>
                <Grid lg={4} md={4} xs={4}>
                  <Typography sx={{ mx: 2, my: 1 }}>
                    {item.product.name}
                  </Typography>
                </Grid>
                <Grid
                  lg={3}
                  md={2}
                  xs={4}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography>Price:{item.product.price}</Typography>
                  <Typography sx={{ mt: 3 }}>
                    {" "}
                    Quantity:{item.quantity}
                  </Typography>
                </Grid>
                <Grid lg={3} md={2} xs={6}>
                  Delete
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={4}
          sx={{
            my: 4,
            ml: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>
            {" "}
            Total Items : {cartItems.length} (Rs {totalPrice})
          </Typography>
          <Typography sx={{ mt: 3 }}> Shipping Fee : Rs 80</Typography>
          <Typography sx={{ mt: 3, textAlign: "right", mr: 4 }} variant="h6">
            {" "}
            Total: Rs {totalPrice + 80}
          </Typography>
          <Typography sx={{ mt: 10 }}>
            <MainButton>Checkout</MainButton>
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Cart;
