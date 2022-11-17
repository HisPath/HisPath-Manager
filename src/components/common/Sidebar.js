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
import { NavLink } from "react-router-dom";
import { drawerWidth, navItems } from "../../constants/commons";
import SettingsIcon from "@mui/icons-material/Settings";

const activeStyle = {
  // color: "#2065D1",
  // backgroundColor: "#D1E9FC",
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
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mx: 0.5 }}
        >
          <SettingsIcon />
        </IconButton>
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
        // PaperProps={{ style: { border: "none" } }}
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
