import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5f63f2",
      light: "#9891ff",
      dark: "#1039be",
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
      default: "#f4f5f7",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "rgb(0 0 0 / 1%) 0px 0px 8px",
    ...Array(23).fill("rgb(0 0 0 / 8%) 0px 0px 8px"),
  ],
});
