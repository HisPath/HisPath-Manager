import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Router from "./Router";
import { theme } from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            "th, td": { whiteSpace: "nowrap" },
          }}
        />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
