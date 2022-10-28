import {
  Box,
  Divider,
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

export default function Sidebar() {
  const drawer = (
    <div>
      <Toolbar sx={{ color: "primary.main" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <SettingsIcon />
        </IconButton>
        <Typography variant="h6">HisPath 관리자</Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            component={NavLink}
            to={item.to}
            sx={{ color: "text.primary" }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
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
