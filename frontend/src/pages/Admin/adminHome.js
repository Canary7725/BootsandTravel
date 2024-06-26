import { Box, Container, Grid, Typography } from "@mui/material";
import AddItems from "../../components/Admin/addItems";
import Drawer from "../../components/Admin/Drawer";
import { theme } from "../../assets/Colors";

import { useAuth } from "../../Context/AuthContext";
const AdminHome = () => {
  const { logout } = useAuth();

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
        <AddItems />
      </Grid>
    </Grid>
  );
};

export default AdminHome;
