import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { theme } from "../../assets/Colors";

export default function AppDrawer() {
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        boxShadow: 4,
        height: "100vh",
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      }}
      role="presentation"
    >
      <Box>
        <Link to="/adminHome">
          <img src={Logo} alt="" />
        </Link>
      </Box>
      <List>
        {[
          { text: "Add Item", link: "/adminHome" },
          { text: "Item List", link: "/itemList" },
          { text: "Manage Orders", link: "/orders" },
          { text: "Add Admin", link: "/addAdmin" },
          { text: "Manage Users", link: "/manageUsers" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/logout">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return DrawerList;
}
