import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './Router';
import { theme } from './style/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
