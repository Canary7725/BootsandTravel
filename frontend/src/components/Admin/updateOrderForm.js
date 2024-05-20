import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { theme } from "../../assets/Colors";

const UpdateOrderStatus = () => {
  const orderId = useParams();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Received orderId:", orderId);
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/order/getOrderById/${orderId.id}`
        );
        setStatus(response.data.data.status);
        console.log(response.data.data.status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order status:", error);
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/order/updateOrder/${orderId.id}`,
        {
          status,
        }
      );
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <FormControl fullWidth sx={{ color: "blue" }}>
        <Select
          labelId="status-label"
          id="status-select"
          value={status}
          onChange={handleChange}
          sx={{
            color: theme.palette.primary.main,
            bgcolor: theme.palette.secondary.main,
          }}
        >
          <MenuItem
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.primary.main,
            }}
            value="pending"
          >
            Pending
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.primary.main,
            }}
            value="processing"
          >
            Processing
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.primary.main,
            }}
            value="shipped"
          >
            Shipped
          </MenuItem>
          <MenuItem
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.primary.main,
            }}
            value="delivered"
          >
            Delivered
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleUpdateStatus}
        sx={{
          color: theme.palette.secondary.main,
        }}
      >
        Update Status
      </Button>
    </div>
  );
};

export default UpdateOrderStatus;
