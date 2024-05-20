import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Context/AuthContext";
import MainButton from "../components/Button";
import { theme } from "../assets/Colors";
import Footer from "../components/Footer";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Toast from "../components/Toast";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const user_id = user ? user._id : null;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/cart/getCartItems/${user_id}`
        );
        if (response.ok) {
          const cartData = await response.json();
          setCart(cartData);
        } else {
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

  const cartItems = cart || [];
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.product.price * item.quantity;
  }

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);

  const [address, setAddress] = useState("");

  const makePayment = async (token) => {
    try {
      if (address !== "") {
        const orders = {
          total_amount: totalPrice + 80,
          productBy: "Me",
        };
        const body = {
          token,
          orders,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const paymentResponse = await fetch(`http://localhost:4000/payment`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        if (paymentResponse.ok) {
          const paymentData = await paymentResponse.json();
          handleSuccess("Payment successful!");

          const orderResponse = await axios.post(
            "http://localhost:4000/api/order/createOrder",
            {
              user_id,
              total_price: totalPrice,
              shipping_address: address,
            },
            { withCredentials: true }
          );

          const { success, message } = orderResponse.data;
          if (success) {
            handleSuccess(message);
            for (const item of cartItems) {
              await axios.delete(
                `http://localhost:4000/api/cart/removeItemFromCart/${item._id}`
              );
            }
            window.location.reload();
          } else {
            handleError(message);
          }
        } else {
          handleError("Payment failed");
        }
      } else {
        handleError("Address must not be empty");
      }
    } catch (error) {
      handleError(error.response ? error.response.data.message : error.message);
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
            My Cart({cartItems.length})
          </Typography>
          {cartItems.map((item) => (
            <Grid
              container
              spacing={2}
              key={item._id}
              sx={{
                display: "flex",
                py: 4,
                mx: 3,
                borderBottom: "2px solid",
              }}
            >
              <Grid lg={2} md={4} xs={4}>
                <img
                  src={`http://localhost:4000/images/product/${item.product.product_images[0]}`}
                  className="h-32 w-32"
                  alt={item.product.name}
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
                <Typography>Price: {item.product.price}</Typography>
                <Typography sx={{ mt: 3 }}>
                  Quantity: {item.quantity}
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
          sx={{ my: 4, ml: 3, display: "flex", flexDirection: "column" }}
        >
          <Typography>
            Total Items: {cartItems.length} (Rs {totalPrice})
          </Typography>
          <Typography sx={{ mt: 3 }}>Shipping Fee: Rs 80</Typography>
          <Typography sx={{ mt: 3, textAlign: "right", mr: 4 }} variant="h6">
            Total: Rs {totalPrice + 80}
          </Typography>
          <TextField
            label="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Typography sx={{ mt: 10 }}>
            <StripeCheckout
              stripeKey={process.env.REACT_APP_KEY}
              token={makePayment}
              name="BootsAndTravel"
              amount={(totalPrice + 80) * 100} // Stripe expects amount in cents
            >
              <MainButton>Checkout {totalPrice + 80}</MainButton>
            </StripeCheckout>
          </Typography>
        </Grid>
      </Grid>
      <Footer />
      <Toast />
    </Box>
  );
};

export default Cart;
