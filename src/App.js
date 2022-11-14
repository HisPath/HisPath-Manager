import { SnackbarProvider } from "notistack";
import Router from "./Router";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
