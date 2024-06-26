import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../Context/AuthContext";
import { useCookies } from "react-cookie";

export default function AppDrawer() {
  const [cookies, removeCookie] = useCookies([]);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    const users = user || {};
    logout(users);
    removeCookie("token");
    navigate("/login");
  };
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        position: "fixed",
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
          { text: "View Revenue", link: "/revenue" },
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
          <ListItemButton onClick={handleLogout}>
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
