import axios from "axios";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import Router from "./Router";
import ThemeProvider from "./theme";

function App() {
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const code = params.get("code");
    params.delete("code");
    if (loading === false && code !== null) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER}/auth/google/login-manager/token?code=${code}`
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("TOKEN", `Bearer ${res.data.token}`);
          window.location.reload();
        });
    }
  }, []);
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
