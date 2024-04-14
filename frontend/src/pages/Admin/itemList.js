import { Box, Container, Grid, Typography } from "@mui/material";
import Drawer from "../../components/Admin/Drawer";
import { theme } from "../../assets/Colors";
import Items from "../../components/Admin/Items";

const ItemList = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
    >
      <Grid lg={3}>
        {" "}
        <Drawer />
      </Grid>
      <Grid lg={9}>
        {" "}
        <Items />
      </Grid>
    </Grid>
  );
};

export default ItemList;
