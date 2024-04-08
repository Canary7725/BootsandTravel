import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { theme } from "../assets/Colors";

export default function MainButton({ children }) {
  return (
    <Button
      variant="contained"
      href="#s"
      sx={{
        mt: 2,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
    >
      {children}
    </Button>
  );
}
