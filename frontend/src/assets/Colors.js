import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f2f3d9", // Specify the main color
    },
    secondary: {
      main: "#1e1e1e", // Specify the main color
    },
  },
  typography: {
    fontFamily: "Poppins,sans-serif",
  },
});
