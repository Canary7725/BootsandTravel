import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { theme } from "../assets/Colors";

const NumberInput = ({ label, value, onIncrement, onDecrement, min, max }) => {
  const handleIncrement = () => {
    if (value < max) {
      onIncrement(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onDecrement(value - 1);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDecrement}
        disabled={value === min}
        sx={{
          my: "10px",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        -
      </Button>
      <TextField
        value={value}
        sx={{
          width: 50,
          height: "20%",
          color: theme.palette.primary.main,
          border: "2px black solid",
          borderRadius: 2,
        }}
        InputProps={{
          sx: {
            "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent", // Set border color to transparent to remove the outline
            },
          },
        }}
      />
      <Button
        onClick={handleIncrement}
        disabled={value === max}
        sx={{ my: "10px", fontSize: 20, fontWeight: "bold" }}
      >
        +
      </Button>
    </div>
  );
};

export default NumberInput;
