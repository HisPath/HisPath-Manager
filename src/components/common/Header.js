import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { drawerWidth } from "../../constants/commons";
import { logout } from "../../services/auth";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={logout}>로그아웃</Button>
      </Toolbar>
    </AppBar>
  );
}
