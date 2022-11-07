import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { drawerWidth } from "../../constants/commons";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Button>로그아웃</Button>
      </Toolbar>
    </AppBar>
  );
}
