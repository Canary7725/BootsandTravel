import { Box, Container, Grid, Typography } from "@mui/material";
import Drawer from "../../components/Admin/Drawer";
import { theme } from "../../assets/Colors";
import Orders from "../../components/Admin/Orders";
const ManageOrder = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        height: "100vh",
      }}
    >
      <Grid lg={3}>
        {" "}
        <Drawer />
      </Grid>
      <Grid lg={9}>
        {" "}
        <Orders />
      </Grid>
    </Grid>
  );
};

export default ManageOrder;
