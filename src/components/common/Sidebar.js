import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { drawerWidth, navItems } from "../../constants/commons";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../assets/Logo.png";

const activeStyle = {
  color: "#00AB55",
  backgroundColor: "#e8f5e9",
};

export default function Sidebar() {
  const drawer = (
    <div>
      <Toolbar
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src={Logo}
            alt="logo"
            height={36}
            sx={{ mx: 2 }}
          />
        </Box>
        <Typography variant="h6">HisPath 관리자</Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            sx={{ color: "text.primary", px: 2, py: 0.5 }}
          >
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                borderRadius: 1,
                height: 40,
                pl: 4,
                ":hover": { color: "primary.main", backgroundColor: "inherit" },
              }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: drawerWidth, flexShrink: 0 }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
