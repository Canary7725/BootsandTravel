import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { theme } from "../../assets/Colors";

const UpdateOrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      // Optionally, you can handle success or show a message here
      console.log("Status updated successfully");
    } catch (error) {
      // Handle error
      console.error("Error updating status:", error);
    }
  };

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
