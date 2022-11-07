import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { drawerWidth } from '../../constants/commons';


export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button>로그아웃</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
