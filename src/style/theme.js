import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#34495e",
      light: "#60748b",
      dark: "#092234",
    },
    secondary: {
      main: "#3478f6",
      light: "#78a6ff",
      dark: "#004dc2",
    },
    text: {
      primary: "#222222",
      secondary: "#808080",
    },
    background: {
      default: "#F9FAFA",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  shadows: ["none", ...Array(24).fill("rgb(0 0 0 / 8%) 0px 0px 8px")],
});
