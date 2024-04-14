import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Context/AuthContext";
import MainButton from "../components/Button";
import { theme } from "../assets/Colors";
import Footer from "../components/Footer";
import { Link, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Toast from "../components/Toast";
import axios from "axios";
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

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);

  const [address, setAddress] = useState();
  const handleCheckout = async () => {
    try {
      if (address != "") {
        const { data } = await axios.post(
          "http://localhost:4000/api/order/createOrder",
          {
            user_id,
            total_price: totalPrice,
            shipping_address: address,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          cartItems.forEach((item) => {
            axios.delete(
              `http://localhost:4000/api/cart/removeItemFromCart/${item._id}`
            );
            window.location.reload();
          });
        } else {
          handleError(message);
        }
      } else {
        handleError("Quantity Must be greater than 0");
      }
    } catch (error) {
      handleError(error.response.data.message);
    }
  };

  return (
    <Box sx={{ bgcolor: theme.palette.secondary.main, overflow: "hidden" }}>
      <NavbarTop />
      <NavbarBottom />
      <Grid container spacing={2} sx={{ my: 6 }}>
        <Grid xs={0} md={0} lg={1}></Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography variant="h4" sx={{ mx: 3, my: 3 }}>
            {" "}
            My Cart({cartItems.length})
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
          <TextField onChange={(e) => setAddress(e.target.value)} />
          <Typography sx={{ mt: 10 }}>
            <form onClick={handleCheckout}>
              <MainButton>Checkout</MainButton>
            </form>
          </Typography>
        </Grid>
      </Grid>
      <Footer />
      <Toast />
    </Box>
  );
};

export default Cart;
