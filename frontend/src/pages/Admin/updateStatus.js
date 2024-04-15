import { Box, Container, Grid, Typography } from "@mui/material";
import Drawer from "../../components/Admin/Drawer";
import { theme } from "../../assets/Colors";
import UpdateOrderStatus from "../../components/Admin/updateOrderForm";

const UpdateStatus = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "white",
        color: theme.palette.secondary.main,
        height: "100vh",
      }}
    >
      <Grid lg={3}>
        {" "}
        <Drawer />
      </Grid>
      <Grid lg={9}>
        <UpdateOrderStatus />{" "}
      </Grid>
    </Grid>
  );
};

export default UpdateStatus;
